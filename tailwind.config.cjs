/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'purple': '#820382',
      },
    },
    fontFamily:{
        sans: ['vazir',"Roboto", "sans-serif"],
    }
  },
  plugins: [],
});
