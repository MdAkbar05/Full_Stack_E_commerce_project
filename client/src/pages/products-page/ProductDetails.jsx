import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Magnifier from "react-magnifier";
import { toast } from "react-toastify";
import { addToCart } from "../../features/cartSlice";
import { addReview } from "../../features/productSlice";

const ProductDetails = () => {
  const notify = (msg) => toast(msg);
  const dispatch = useDispatch();
  const { currentProduct } = useSelector((state) => state.productsReducer);
  const profile = JSON.parse(localStorage.getItem("user"));
  // State to handle review form data
  const [review, setReview] = useState({
    userId: profile?.id || "",
    rating: 0,
    comment: "",
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (profile) {
      console.log("Review submitted: ", review);
    } else {
      notify("Please log in to review the product.");
      return;
    }
    // Submit review logic here
    const id = currentProduct._id;
    dispatch(addReview({ review, id }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {currentProduct && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image with Magnifier */}
            <div className="flex justify-center border w-fit mx-auto p-4 shadow-sm items-center">
              <Magnifier
                src={currentProduct.image}
                width={220}
                mgShape="square"
                zoomFactor={1.5}
              />
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {currentProduct.name}
              </h1>
              <p className="text-xl text-gray-700">
                Price: ৳{currentProduct.price}
              </p>
              <p className="text-gray-600">
                Category:{" "}
                <span className="font-semibold">
                  {currentProduct.category.name}
                </span>
              </p>
              <span className="flex">
                Rating:{" "}
                <span className="font-bold">
                  {currentProduct.ratings.toFixed(2)}
                </span>
              </span>
              <p className="text-gray-600">
                Shipping: ৳{currentProduct.shipping}
              </p>
              <p className="text-gray-600">
                Available: {currentProduct.quantity} in stock
              </p>
              <p className="text-gray-500 leading-relaxed">
                {currentProduct.description}
              </p>

              <div className="mt-6">
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => {
                    dispatch(addToCart(currentProduct));
                    notify("Product added successfully");
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Customer Reviews
            </h2>

            {/* Display Reviews */}
            {currentProduct.reviews && currentProduct.reviews.length > 0 ? (
              <div className="space-y-6">
                {currentProduct.reviews.map((review, index) => (
                  <div key={index} className="border-b space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="size-10 rounded-full font-semibold text-lg bg-primary flexCenter text-white">
                        {review.user.name?.slice(0, 1)}
                      </span>
                      <p className="">{review.user.name}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex">
                        {Array.from({ length: review.rating }, (_, i) => (
                          <span key={i} className="text-lg">
                            ✳️
                          </span>
                        ))}
                      </span>
                      <span>
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-gray-600 py-4">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet.</p>
            )}

            {/* Write a Review Form */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Write a Review
              </h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                {/* Rating Input */}
                <div>
                  <label
                    htmlFor="rating"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Rating
                  </label>
                  <select
                    id="rating"
                    name="rating"
                    value={review.rating}
                    onChange={handleInputChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="0">Select a rating</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Comment Input */}
                <div>
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows="4"
                    value={review.comment}
                    onChange={handleInputChange}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
