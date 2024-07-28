const express = require("express");
const {
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
} = require("../controllers/user.controller");
const { userProfileUpload } = require("../middlewares/uploadFiles");
const { validateUserRegistration } = require("../validations/auth");
const runValidation = require("../validations");
const {
  isLoggedIn,
  isLoggedOut,
  isAdmin,
  isBanned,
} = require("../middlewares/Auth");
const userRouter = express.Router();
// GET: api/users/
userRouter.get("/", isLoggedIn, isAdmin, isBanned, getUsers);
userRouter.get("/:id([0-9a-fA-F]{24})", isLoggedIn, getUserById);
userRouter.post(
  "/process-register/",
  isLoggedOut,
  userProfileUpload.single("image"),
  validateUserRegistration,
  runValidation,
  processRegister
);
userRouter.post("/verify/:token", isLoggedOut, activateUserAccount);
userRouter.delete("/:id([0-9a-fA-F]{24})", delteUserById);
userRouter.put("/reset-password/", handleResetPassword);
userRouter.put("/:id([0-9a-fA-F]{24})", updateUserById);
userRouter.put(
  "/ban-user/:id([0-9a-fA-F]{24})",
  isLoggedIn,
  isAdmin,
  handleBanUser
);
userRouter.put(
  "/unban-user/:id([0-9a-fA-F]{24})",
  isLoggedIn,
  isAdmin,
  handleUnbanUser
);
userRouter.put(
  "/update-password/:id([0-9a-fA-F]{24})",
  isLoggedIn,
  handleUpdatePasswords
);

userRouter.post("/forget-password/", isLoggedOut, handleForgetPassword);

module.exports = userRouter;
