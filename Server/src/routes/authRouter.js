const express = require("express");

const runValidation = require("../validations");
const { handleLogin, handleLogout } = require("../controllers/auth.controller");
const { isLoggedOut, isLoggedIn } = require("../middlewares/Auth");

const authRouter = express.Router();
// GET: api/auth/

authRouter.post("/login", isLoggedOut, handleLogin);
authRouter.post("/logout", isLoggedIn, handleLogout);
module.exports = authRouter;
