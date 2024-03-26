const express = require("express");
const {
  getUsers,
  getUserById,
  delteUserById,
  processRegister,
  activateUserAccount,
} = require("../controllers/user.controller");
const upload = require("../middlewares/uploadFiles");
const { validateUserRegistration } = require("../validations/auth");
const runValidation = require("../validations");
const userRouter = express.Router();
// GET: api/
userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", delteUserById);
userRouter.post(
  "/process-register/",
  upload.single("image"),
  validateUserRegistration,
  runValidation,
  processRegister
);
userRouter.post("/verify/:token", activateUserAccount);
// app.get("/products", (req, res) => {
//     res.status(201).json({
//       message: "All Products are returned",
//     });
//   });

//   app.post("/product", (req, res) => {
//     res.status(202).json({
//       message: "Product added successfully",
//     });
//   });

//   app.put("/product", (req, res) => {
//     res.status(202).json({
//       message: "Product Updated successfully",
//     });
//   });

//   app.delete("/product", (req, res) => {
//     res.status(202).json({
//       message: "Product removed successfully",
//     });
//   });

module.exports = userRouter;
