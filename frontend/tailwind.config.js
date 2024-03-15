/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.tsx", "./src/components/**/*.tsx"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
