const express = require("express");
const runValidation = require("../validations");
const { isLoggedIn, isAdmin } = require("../middlewares/Auth");
const {
  handleCreateProduct,
  handleGetProduct,
  handleGetProducts,
  handleUpdateProduct,
  handleDeleteProduct,
} = require("../controllers/productsController");
const { productsProfileUpload } = require("../middlewares/uploadFiles");
const { validateProduct } = require("../validations/products");

const productsRouter = express.Router();
//  /api/categories/

productsRouter.post(
  "/",
  productsProfileUpload.single("image"),
  validateProduct,
  runValidation,
  //   isLoggedIn,
  //   isAdmin,
  handleCreateProduct
);

productsRouter.get("/", handleGetProducts);
productsRouter.get("/:slug", handleGetProduct);
productsRouter.put(
  "/:slug",
  productsProfileUpload.single("image"),
  handleUpdateProduct
);
productsRouter.delete("/:slug", handleDeleteProduct);

module.exports = productsRouter;
