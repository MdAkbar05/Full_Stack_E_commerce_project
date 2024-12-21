import React from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";

import { toast } from "react-toastify";
import { addToFavourite } from "../../features/favouriteSlice";
import { getProductBySlug } from "../../features/productSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const notify = (msg) => toast(msg);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col justify-around gap-y-4   sm:w-64 md:w-72 lg:w-72 h-auto border rounded-3xl shadow-lg shadow-green-100 border-none py-2 px-4 bg-white hover:scale-105 transition-transform cursor-pointer">
      <div
        className="mx-auto object-cover "
        onClick={() => {
          dispatch(getProductBySlug(product.slug));
          navigate("/current-product");
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full lg:h-40 md:h-32 sm:h-20  object-cover rounded-2xl "
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="flex ">
            {Array.from({ length: product.ratings }, (_, i) => (
              <span key={i} className="text-lg">
                ⭐
              </span>
            ))}{" "}
          </span>
          <span className="font-semibold">{product.ratings.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <div className="font-bold text-xl">{product.name}</div>
          <div
            onClick={() => {
              dispatch(addToFavourite(product));
              notify("Product added to favourites");
            }}
          >
            ❤️
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="bg-blue-200 rounded-full px-2 inline-flex text-black  border-[0.5px] text-sm shadow-sm">
            {product.category.name}
          </div>
          <div className="bg-blue-200 rounded-full px-2 inline-flex text-black  border-[0.5px] text-sm shadow-sm">
            Sold: {product.sold}
          </div>
          <div className="bg-blue-200 rounded-full px-2 inline-flex text-black  border-[0.5px] text-sm shadow-sm">
            Stock: {product.quantity - product.sold}
          </div>
        </div>
        <div className="font-medium text-sm">{product.description}</div>
      </div>

      <div className="flex justify-between ">
        <div className="font-semibold px-3 py-1 bg-green-200 text-green-700 rounded-xl">
          {product.price} TK
        </div>
        <button
          onClick={() => {
            dispatch(addToCart(product));
            notify("Product added successfully");
          }}
          className="font-semibold px-3 py-1 bg-red-200 text-red-700 rounded-xl"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
