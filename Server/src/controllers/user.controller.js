const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const User = require("../models/users.model");
const { successResponse } = require("./responseController");
const { findWithId } = require("../services/findItem");
const { deleteImage } = require("../services/deleteImage");
const { createJSONWebToken } = require("../services/jsonWebToken");
const {
  jwtActivationKey,
  clientURL,
  jwt_reset_pass_key,
} = require("../secret");
const emailWithNodeMailer = require("../services/email");
const runValidation = require("../validations");
const path = require("node:path");
const {
  forgetPasswordByEmail,
  resetPassword,
} = require("../services/userServices");

const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const searchRegEx = new RegExp(".*" + search + ".*", "i");
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegEx } },
        { email: { $regex: searchRegEx } },
        { phone: { $regex: searchRegEx } },
      ],
    };
    // For not return Password
    const options = { password: 0 };
    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await User.find(filter).countDocuments();
    if (!users || users.length === 0) throw createError(404, "No user found");

    return successResponse(res, {
      statusCode: 200,
      message: "Users were return successfully.",
      payload: {
        users: users,
        pagination: {
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(createError(404, "Routes not found"));
  }
};

const getUserById = async (req, res, next) => {
  try {
    // console.log(req.users);
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);
    return successResponse(res, {
      statusCode: 201,
      message: "User were return successfully.",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const imgPath = req.file ? req.file.path : "default.png";
    const imageName = path.basename(imgPath);
    const image = `/images/users/${imageName}`;

    //user exist check
    const userExists = await User.exists({ email: email });
    if (userExists) {
      throw createError(
        409,
        "User with this email already exists. Please sign with new email."
      );
    }
    //create jwt
    const token = createJSONWebToken(
      { name, email, password, address, phone, image },
      jwtActivationKey,
      "10m"
    );

    //prepare email
    const emailData = {
      email,
      subject: "Account activation email",
      html: `
        <h2> Hello ${name} !</h2>
        <p > Please click here to <a href="${clientURL}/api/users/verify/${token}" target="_blank"> activate your account</a>  </p>
        `,
    };
    //send email with nodemailer
    // try {
    //   await emailWithNodeMailer(emailData);
    // } catch (emailError) {
    //   next(createError(500, "Failed to send verification"));
    // }
    return successResponse(res, {
      statusCode: 200,
      message: `Please go to your ${email} for completing your registration process.`,
      payload: { token },
    });
    console.log(token);
  } catch (error) {
    next(error);
  }
};

const activateUserAccount = async (req, res, next) => {
  try {
    const token = req.params.token;
    if (!token) {
      res.status(401).json({ success: false, message: "Token not found" });
    }
    const decoded = jwt.verify(token, jwtActivationKey);
    if (!decoded) {
      res
        .status(401)
        .json({ success: false, message: "Unable to verify user" });
    }
    const userExists = await User.exists({ email: decoded.email });
    if (userExists) {
      res.status(409).json({
        success: false,
        message:
          "User with this email already exists. Please sign with new email.",
      });
    }
    const user = await User.create(decoded);
    return successResponse(res, {
      statusCode: 201,
      message: "User was registered successfully",
      payload: { user },
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ success: false, message: "Token has expired" });
    } else if (error.name === "JsonWebTokenError") {
      res.status(401).json({ success: false, message: "Invalid Token" });
    } else {
      throw error;
    }
  }
};

const delteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);

    const userImagePath = user.image;

    deleteImage(userImagePath);

    await User.findByIdAndDelete({ _id: id, isAdmin: false });

    return successResponse(res, {
      statusCode: 201,
      message: "User were delete successfully.",
      // payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const UserId = req.params.id;
    const updateOption = { new: true, contex: "query" };

    let updates = {};

    if (req.body.email) {
      throw createError(400, "Email can not be update");
    }

    const allowedField = ["name", "password", "address", "phone"];

    for (const key in req.body) {
      if (allowedField.includes(key)) {
        updates[key] = req.body[key];
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      UserId,
      updates,
      updateOption
    ).select("-password");

    if (!updatedUser) {
      throw createError(404, "User with this Id does not exist");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "User was update successfully.",
      payload: { updatedUser },
    });
  } catch (error) {
    next(error);
  }
};

const handleBanUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(
      userId,
      { isBanned: true },
      { new: true }
    ).select("-password");
    if (!user) {
      throw createError(404, "User with this Id does not exist");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "User was banned successfully.",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

const handleUnbanUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndUpdate(
      userId,
      { isBanned: false },
      { new: true }
    ).select("-password");
    if (!user) {
      throw createError(404, "User with this Id does not exist");
    }
    return successResponse(res, {
      statusCode: 200,
      message: "User was unbanned successfully.",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdatePasswords = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword, email } = req.body;
    // Check is empty old Pass
    if (oldPassword === "") {
      throw createError(400, "Old password field cannot be empty");
    }

    // check is newpasss empty
    if (newPassword === "") {
      throw createError(400, "New password field cannot be empty");
    }

    // check is empty email
    if (email === "") {
      throw createError(400, "Email field cannot be empty");
    }
    // Check new pass and confirm pass
    if (newPassword !== confirmPassword) {
      throw createError(
        400,
        "New password and Confirm password does not match"
      );
    }
    // const userId = req.params.id;
    const users = await User.findOne({ email: email });
    // const user = await User.findById({ _id: userId });

    // compare the password
    const isPassword = await bcrypt.compare(oldPassword, users.password);
    if (!isPassword) {
      throw createError(400, "Old password is incorrect");
    }

    // Update the user's password in the database
    users.password = newPassword;
    await users.save();

    return successResponse(res, {
      statusCode: 200,
      message: "User was updated successfully.",
      payload: { users },
    });
  } catch (error) {
    next(error);
  }
};

const handleForgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const token = await forgetPasswordByEmail(email);
    console.log(token);

    return successResponse(res, {
      statusCode: 200,
      message: `Please go to your ${email} for completing your reset password process.`,
      payload: token,
    });
  } catch (error) {
    next(error);
  }
};

const handleResetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    const updatedUser = await resetPassword(token, password);
    return successResponse(res, {
      statusCode: 200,
      message: "User account password reset successfully",
      payload: { updatedUser },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  delteUserById,
  processRegister,
  activateUserAccount,
  updateUserById,
  handleBanUser,
  handleUnbanUser,
  handleUpdatePasswords,
  handleForgetPassword,
  handleResetPassword,
};
