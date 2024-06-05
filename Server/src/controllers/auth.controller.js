const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../models/users.model");
const { successResponse } = require("./responseController");
const { createJSONWebToken } = require("../services/jsonWebToken");
const { jwtActivationKey, clientURL, jwtAccessKey } = require("../secret");
const bcrpt = require("bcryptjs");

const handleLogin = async (req, res, next) => {
  try {
    // email, password req.body
    const { email, password } = req.body;
    //is exits
    const userExits = await User.findOne({ email: email });

    console.log(userExits);
    if (!userExits) {
      throw createError(
        404,
        "User does not exist with this email. Please register first."
      );
    }
    // compare the password
    const isPassword = await bcrpt.compare(password, userExits.password);
    if (!isPassword) {
      throw createError(401, "password did not match");
    }
    // isBanned

    if (userExits.isBanned) {
      throw createError(403, "You are banned. Please contact with authority");
    }
    // check valid user with token by cookie
    const accessToken = createJSONWebToken(
      { id: userExits._id },
      jwtAccessKey,
      "5m"
    );

    res.cookie("accessToken", accessToken, {
      maxAge: 10 * 60 * 1000, // 10min
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    // Success response
    return successResponse(res, {
      statusCode: 200,
      message: "User loggedin successfully",
      payload: { userExits },
    });
  } catch (error) {
    next(error);
  }
};

const handleLogout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    // Success response
    return successResponse(res, {
      statusCode: 200,
      message: "User Logout successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { handleLogin, handleLogout };
