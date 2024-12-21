import React from "react";
import Slider from "react-slick";
import banner1 from "./img/banner1.png";
import banner2 from "./img/banner2.png";
import banner3 from "./img/banner3.png";
// Importing required CSS for react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HeroSection = () => {
  // Slider settings for react-slick
  const settings = {
    dots: true, // Enable dots for navigation
    infinite: true, // Infinite loop for the slider
    speed: 500, // Transition speed in ms
    slidesToShow: 1, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Autoplay speed in ms
    arrows: true, // Show next/prev arrows
  };

  // Data for slides
  const sliderData = [
    {
      image: banner1,
      title: "Welcome to Super Shop",
      subtitle: "Sagor Department - Your One Stop Shop",
      buttonText: "Shop Now",
    },
    {
      image: banner2,
      title: "Best Deals Everyday",
      subtitle: "Find your favorite products at unbeatable prices",
      buttonText: "Discover Deals",
    },
    {
      image: banner3,
      title: "New Arrivals",
      subtitle: "Check out the latest in fashion, electronics, and more",
      buttonText: "Explore Now",
    },
  ];

  return (
    <div className="bg-white h-full relative flex justify-center items-center">
      <Slider {...settings} className="w-full h-full relative">
        {sliderData.map((slide, index) => (
          <div
            key={index}
            className="relative h-[80vh] flex justify-center items-center"
          >
            {/* Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute top-0 left-0 w-full h-full object-center"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSection;
