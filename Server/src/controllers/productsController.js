const { successResponse } = require("./responseController");
const Products = require("../models/productsModel");
const createError = require("http-errors");
const slugify = require("slugify");
const path = require("node:path");
const {
  createProduct,
  getProduct,
  deleteProductbySlug,
} = require("../services/productsServices");
// Create a new product
const handleCreateProduct = async (req, res, next) => {
  try {
    const { name, description, quantity, price, shipping, category } = req.body;
    const imgPath = req.file ? req.file.path : "default.png";
    const imageName = path.basename(imgPath);
    const image = `/images/products/${imageName}`;

    if (!image) {
      throw createError(400, "Product image is required.");
    }

    if (image.size > 1024 * 1024 * 2) {
      throw createError(400, "Product image size should not exceed 2MB.");
    }

    const productData = {
      name,
      description,
      quantity,
      price,
      shipping,
      category,
    };

    if (image) {
      productData.image = image;
    }
    const product = await createProduct(productData);

    return successResponse(res, {
      statusCode: 200,
      message: "New products were created successfully",
      payload: { product },
    });
  } catch (error) {
    next(error);
  }
};
// Create a new product
const handleGetProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const limit = parseInt(req.params.limit) || 10;

    const product = await getProduct(page, limit);
    const count = product.length;
    const totalPages = Math.ceil(count / limit);

    return successResponse(res, {
      statusCode: 200,
      message: "Return all products successfully",
      payload: {
        product,
        pagination: {
          totalPages: totalPages,
          currentPage: page,
          previousPage: page > 1 ? page - 1 : 1,
          nextPage: page < totalPages ? page + 1 : totalPages,
          limit,
          totalCount: count,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleGetProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const product = await Products.findOne({ slug: slug }).populate("category");

    return successResponse(res, {
      statusCode: 200,
      message: "Return product successfully",
      payload: { product },
    });
  } catch (error) {
    next(error);
  }
};
const handleUpdateProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const updateOption = { new: true, runValidators: true, context: "query" };

    let updates = {};

    const allowedFields = [
      "name",
      "description",
      "price",
      "sold",
      "quantity",
      "shipping",
    ];
    for (const key in req.body) {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      } else {
        throw createError(400, `Invalid update field: ${key}`);
      }
    }

    const imgPath = req.file ? req.file.path : null;
    let image;
    if (imgPath) {
      const imageName = imgPath ? path.basename(imgPath) : null;
      image = `/images/products/${imageName}`;
    }

    if (image) {
      updates.image = image;
    }

    const updatedProduct = await Products.findOneAndUpdate(
      { slug },
      updates,
      updateOption
    );

    if (!updatedProduct) {
      throw createError(404, "Product not updated found.");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Product updated successfully",
      payload: { updatedProduct },
    });
  } catch (error) {
    next(error);
  }
};
const handleDeleteProduct = async (req, res, next) => {
  try {
    const { slug } = req.params;

    await deleteProductbySlug(slug);
    return successResponse(res, {
      statusCode: 200,
      message: "Delete product successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreateProduct,
  handleGetProducts,
  handleGetProduct,
  handleUpdateProduct,
  handleDeleteProduct,
};
