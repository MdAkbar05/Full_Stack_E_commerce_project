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
    const users = await User.findOne({ email: email });

    if (!users) {
      throw createError(
        404,
        "User does not exist with this email. Please register first."
      );
    }
    // compare the password
    const isPassword = await bcrpt.compare(password, users.password);
    if (!isPassword) {
      throw createError(401, "password did not match");
    }
    // isBanned

    if (users.isBanned) {
      throw createError(403, "You are banned. Please contact with authority");
    }
    // check valid user with token by cookie
    const accessToken = createJSONWebToken({ users }, jwtAccessKey, "15m");

    res.cookie("accessToken", accessToken, {
      maxAge: 15 * 60 * 1000, // 15min
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    // Success response
    return successResponse(res, {
      statusCode: 200,
      message: "User loggedin successfully",
      payload: { users },
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
