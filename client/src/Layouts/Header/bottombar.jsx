// BottomBar.js
import React from "react";
import { Link } from "react-router-dom";

const BottomBar = () => {
  return (
    <div className=" bg-secondary backdrop-blur-md text-background">
      <div className="container mx-auto md:p-2 sm:px-4 sm:py-2 flexCenter gap-6">
        <Link to="/" className="flexCenter" title="Home">
          Home
        </Link>
        <Link to="/products" className="flexCenter" title="Products">
          Products
        </Link>
        <Link to="/" className="flexCenter" title="Offers">
          Offers
        </Link>
        <Link to="/contact" className="flexCenter" title="Contact">
          Contact
        </Link>
        <Link to="/about" className="flexCenter" title="Abouts">
          About
        </Link>
      </div>
    </div>
  );
};

export default BottomBar;
