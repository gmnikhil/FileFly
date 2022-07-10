/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        baseColor: "#e5788c",
        accentColor: "rgb(96 165 250)",
      },
    },
  },
  plugins: [],
};
