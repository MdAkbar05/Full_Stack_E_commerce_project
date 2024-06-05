const express = require("express");
const {
  getUsers,
  getUserById,
  delteUserById,
  processRegister,
  activateUserAccount,
  updateUserById,
} = require("../controllers/user.controller");
const upload = require("../middlewares/uploadFiles");
const { validateUserRegistration } = require("../validations/auth");
const runValidation = require("../validations");
const isLoggedIn = require("../middlewares/Auth");
const userRouter = express.Router();
// GET: api/
userRouter.get("/", isLoggedIn, getUsers);
userRouter.get("/:id", getUserById);
userRouter.post(
  "/process-register/",
  upload.single("image"),
  validateUserRegistration,
  runValidation,
  processRegister
);
userRouter.post("/verify/:token", activateUserAccount);
userRouter.delete("/:id", delteUserById);
userRouter.put("/:id", updateUserById);

module.exports = userRouter;
