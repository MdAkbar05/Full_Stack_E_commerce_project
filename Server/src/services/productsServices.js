const slugify = require("slugify");
const Products = require("../models/productsModel");
const createError = require("http-errors");
const deleteServerImage = require("./deleteServerImage");
const path = require("path");

const createProduct = async (productData) => {
  const { name, description, quantity, price, shipping, category, image } =
    productData;

  const productExists = await Products.exists({ name: name });

  if (productExists) {
    throw createError(409, "Product with this name already exists.");
  }

  // Create new product
  const product = await Products.create({
    name,
    slug: slugify(name),
    description: description,
    quantity: quantity,
    price: price,
    shipping: shipping,
    image: image,
    category: category,
  });

  return product;
};

const getProduct = async (page, limit) => {
  const products = await Products.find({})
    .populate("category")
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({ createdAt: -1 });

  if (!products || products.length === 0) {
    throw createError(409, " product not found");
  }

  return products;
};

const deleteProductbySlug = async (slug) => {
  const product = await Products.findOneAndDelete({ slug: slug });
  if (!product) {
    throw createError(404, "Product not found with the slug");
  }

  if (product && product.image) {
    const image = path.resolve(`../client/public${product.image}`);
    await deleteServerImage(image);
  }
};
module.exports = {
  createProduct,
  getProduct,
  deleteProductbySlug,
};
