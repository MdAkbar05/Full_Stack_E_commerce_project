import React from "react";
import { GiPayMoney } from "react-icons/gi";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";

const Features = () => {
  const features = [
    {
      icon: <GiPayMoney size={50} />,
      feature: "Pay after receiving products",
    },
    {
      icon: <MdOutlineDeliveryDining size={50} />,
      feature: "Get your delivery within 30 minutes",
    },
    {
      icon: <BiSolidOffer size={50} />,
      feature: "Exclusive offers for every purchase",
    },
    {
      icon: <BiSolidOffer size={50} />,
      feature: "24/7 support to customers",
    },
  ];

  return (
    <section className="bg-white py-16 mt-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-primary mb-12">
          Why choose us ?
        </h2>

        {/* Horizontal Line */}
        <hr className="w-24 mx-auto border-primary border-2 mb-12" />

        {/* Features Flexbox */}
        <div className="flexCenter flex-col sm:flex-row flex-wrap gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 bg-primary shadow-lg rounded-xl transform transition duration-300 hover:scale-105 cursor-pointer lg:w-3/12 md:w-3/5 sm:w-4/5 h-44"
            >
              <div className="mb-4 text-background">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-background">
                {feature.feature}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
