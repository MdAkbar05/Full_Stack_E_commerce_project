// BottomBar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const BottomBar = () => {
  const location = useLocation();
  return (
    <div className=" bg-secondary backdrop-blur-md text-black">
      <div className="container mx-auto p-1 sm:px-4  flex items-center md:gap-6 sm:gap-2 ">
        <Link
          to="/"
          className={`flexCenter rounded-full px-3 py-1  ${
            location.pathname === "/" ? " bg-white text-black" : ""
          }`}
          title="Home"
        >
          Home
        </Link>

        <div className="flex justify-between  item-center flex-auto">
          <div className="flexCenter  md:gap-6 sm:gap-2">
            <Link
              to="/products"
              className={`flexCenter rounded-full px-3 py-1 ${
                location.pathname === "/products" ? " bg-white text-black" : ""
              }`}
              title="Products"
            >
              Categories
            </Link>
            <Link
              to="/offers"
              className={`flexCenter rounded-full px-3 py-1 ${
                location.pathname === "/offers" ? "bg-white text-black" : ""
              }`}
              title="Offers"
            >
              Offers
            </Link>
            <Link to="/contact" className="flexCenter" title="Contact">
              Contact
            </Link>
            <Link to="/about" className="flexCenter" title="Abouts">
              About
            </Link>
          </div>
          <div className="text-sm flexCenter sm:hidden md:flex">
            Need help ?{" "}
            <span className="text-hightlight ml-2">
              akbar.hossan.official@gmail.com
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBar;
