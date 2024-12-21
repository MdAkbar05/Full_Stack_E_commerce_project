import React from "react";
import fresh from "./img/fresh.png";
import kishwan from "./img/kishwan.png";
import nestle from "./img/nestle.png";
import ruchi from "./img/Ruchi.png";
import pusti from "./img/pusti.png";
import square from "./img/square.jpg";
import Aci from "./img/Aci.png";
import Unilever from "./img/Unilever.png";

const Companys = () => {
  const companies = [
    { id: 1, logo: fresh, name: "Fresh" },
    { id: 2, logo: kishwan, name: "Kishwan" },
    { id: 3, logo: nestle, name: "Nestle" },
    { id: 4, logo: ruchi, name: "Ruchi" },
    { id: 5, logo: pusti, name: "Pusti" },
    { id: 6, logo: square, name: "Square" },
    { id: 7, logo: Aci, name: "Aci" },
    { id: 8, logo: Unilever, name: "Unilever" },
  ];

  return (
    <section className="bg-white py-16 mt-4">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          Available Brands
        </h2>

        {/* Horizontal Line */}
        <hr className="w-24 mx-auto border-primary border-2 mb-12" />

        {/* Company Logos using Flexbox */}
        <div className="flex flex-wrap justify-center items-center gap-14">
          {companies.map((item) => (
            <div key={item.id} className="flex flex-col items-center">
              <img
                src={item.logo}
                alt={item.name}
                className="mb-2 w-auto h-16"
              />
              <p className="text-gray-600 font-semibold">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companys;
