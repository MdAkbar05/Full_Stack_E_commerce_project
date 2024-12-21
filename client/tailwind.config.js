/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#235BAF",
        secondary: "#2D3A4F",
        // primary: "#164863",
        // secondary: "#427D9D",
        background: "#DDF2FD",
        hightlight: "#399918",
        dashNav: "#ffffff41",
        dashText: "#5e7d8b",
        dashBorder: "#CFD8DC",
        dashActive: "#383838",
      },
      fontFamily: {
        body: ["Poppins", "Arial", "sans-serif"],
      },
      screens: {
        sm: "354px",
        md: "668px",
        lg: "924px",
        xl: "1280px",
      },
      // fontSize: {
      //   xs: "0.75rem",
      //   sm: "0.875rem",
      //   base: "1rem",
      //   lg: "1.125rem",
      //   xl: "1.25rem",
      // },
    },
  },
  plugins: [],
};
