const { Schema, model } = require("mongoose");

// name, slug, description  , price, quantity, sold, shpping, image.
const productsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Products name is required"],
      trim: true,
      minlength: [2, "Products name can be use minimum 3 characters"],
      maxlength: [150, "Products name can be use minimum 150 characters"],
    },
    slug: {
      type: String,
      required: [true, "Products slug is required"],
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Products description is required"],
      trim: true,
      minlength: [3, "Products description can be use maximum 3 characters"],
    },
    price: {
      type: Number,
      required: [true, "Products price is required"],
      validate: {
        validator: (v) => v > 0,
        message: (props) => {
          `${props.value} is not  a valid price! Price must be greater than 0`;
        },
      },
    },
    quantity: {
      type: Number,
      required: [true, "Products quantity is required"],
      validate: {
        validator: (v) => v > 0,
        message: (props) => {
          `${props.value} is not  a valid quantity! Quantit must be greater than 0`;
        },
      },
    },
    sold: {
      type: Number,
      required: [true, "Products sold is required"],
      default: 0,
    },
    shipping: {
      type: Number,
      default: 0, // shipping free o or paid amout
    },
    image: {
      type: String,
      default: "/images/products/super-white.png",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Products category is required"],
    },
  },
  { timestamps: true }
);

const Products = model("Products", productsSchema);

module.exports = Products;
