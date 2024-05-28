const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../models/users.model");
const { successResponse } = require("./responseController");
const { findWithId } = require("../services/findItem");
const { deleteImage } = require("../services/deleteImage");
const { createJSONWebToken } = require("../services/jsonWebToken");
const { jwtActivationKey, clientURL } = require("../secret");
const emailWithNodeMailer = require("../services/email");

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
    if (!users) throw createError(404, "No user found");

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

const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const image = `/images/users/${req.file ? req.file.filename : ""}`;

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
    try {
      await emailWithNodeMailer(emailData);
    } catch (emailError) {
      next(createError(500, "Failed to send verification"));
    }
    return successResponse(res, {
      statusCode: 200,
      message: `Please go to your ${email} for completing your registration process.`,
      payload: { token },
    });
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
module.exports = {
  getUsers,
  getUserById,
  delteUserById,
  processRegister,
  activateUserAccount,
};
