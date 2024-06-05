const express = require("express");

const runValidation = require("../validations");
const { handleLogin, handleLogout } = require("../controllers/auth.controller");
const authRouter = express.Router();
// GET: api/auth/

authRouter.post("/login", handleLogin);
authRouter.post("/logout", handleLogout);
module.exports = authRouter;
