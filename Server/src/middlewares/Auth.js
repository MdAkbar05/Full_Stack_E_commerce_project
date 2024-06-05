const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { jwtAccessKey } = require("../secret");

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      throw createError(401, "Access token not found");
    }

    const decoded = jwt.verify(token, jwtAccessKey);
    if (!decoded) {
      throw createError(402, "Invalid Token. Please login.");
    }
    req.body.userId = decoded._id;
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = isLoggedIn;
