import React from "react";
import Slider from "react-slick";
import { testimonials } from "./data"; // Import testimonial data

const TestimonialSlider = () => {
  const settings = {
    accessibility: true,
    pauseOnHover: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-white mt-4 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-primary mb-10">
          What Our Clients Say
        </h2>
        {/* Horizontal Line */}
        <hr className="w-24 mx-auto border-primary border-2 mb-12" />
        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <img
                className=" mb-6 w-24 h-24 rounded-full border-4 border-primary mx-auto"
                src={testimonial.image}
                alt={testimonial.name}
              />

              <div className="text-center">
                <p className="text-lg italic text-gray-700 mb-4">
                  "{testimonial.testimonial}"
                </p>
                <h3 className="text-xl font-semibold text-gray-900">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-500">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialSlider;
