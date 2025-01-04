/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7c3aed",
      },
      boxShadow: {
        box: "0 0 10px 1px rgba(0,0,0,0.1)",
        "box-lg": "0 0 15px 1px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
