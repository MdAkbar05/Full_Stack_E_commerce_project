import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/categorySlice";
import { BiCategory } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const { categories, error, status } = useSelector(
    (state) => state.categoryReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (status === "loading")
    return <div className="flex justify-center text-xl my-12">Loading...</div>;
  if (error)
    return (
      <div className="text-center font-semibold text-red-500 p-4 bg-white mt-4">
        {error} <br /> Your server maybe down
      </div>
    );

  return (
    <section className="bg-white py-16 mt-4">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          Explore Our Categories
        </h2>

        {/* Horizontal Line */}
        <hr className="w-24 mx-auto border-primary border-2 mb-12" />

        {/* Categories List */}
        <ul className="flexCenter flex-col sm:flex-row flex-wrap gap-8">
          {categories.map((category) => (
            <li
              key={category._id}
              onClick={() =>
                navigate("/products", { state: { filteredBy: category.slug } })
              }
              className="bg-white shadow-lg rounded-lg p-6 text-center border-t-4 border-primary transform hover:scale-105 transition-transform duration-300 flexCenter flex-col    text-primary  text-lg font-semibold   cursor-pointer lg:w-3/12 md:w-3/5 sm:w-4/5 h-44"
            >
              <BiCategory size={36} className="mb-2" />
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Categories;
