/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      // prim == primary; sec == secondary
      "prim-dark-blue": "#0a1929",
      "prim-light-blue": "#66b2ff",
      "sec-dark-blue": "#001e3c",
      "sec-light-blue": "#5090d3",
      "prim-white": "#ffffff",
      "sec-white": "#757575",
    },
    extend: {},
  },
  plugins: [],
}
