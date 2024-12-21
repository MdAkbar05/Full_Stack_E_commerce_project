import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

const Maps = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-primary mb-8">
          Locate Our Store & Stay Connected
        </h2>
        {/* Horizontal Line */}
        <hr className="w-24 mx-auto border-primary border-2 mb-12" />
        {/* Google Map Embed */}
        <div className="flex justify-center items-center">
          <iframe
            title="Google Map Location"
            width="100%"
            height="600"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3339.7666712425826!2d91.79612597475025!3d22.33238314173271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd9eefe5d9e85%3A0x18272115f4ce1e10!2sSagor%20Store!5e1!3m2!1sen!2sus!4v1727888606770!5m2!1sen!2sus"
            className="rounded-md shadow-lg"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Maps;
