const { body } = require("express-validator");

const validateProduct = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 2, max: 150 })
    .withMessage("Product name should be between 2 and 150 characters"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description name is required")
    .isLength({ min: 2 })
    .withMessage("Description name should be minimum 2 characters"),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("Price name is required")
    .isLength({ min: 0 })
    .withMessage("Price name should be positive number"),
  body("quantity")
    .trim()
    .notEmpty()
    .withMessage("Quantity is required")
    .isLength({ min: 1 })
    .withMessage("Quantity should be positive number"),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("Price name is required")
    .isLength({ min: 0 })
    .withMessage("Price name should be positive number"),
  body("category").trim().notEmpty().withMessage("Category is required"),
  body("image").optional().isString().withMessage("Product image is optional"),
];

module.exports = { validateProduct };
