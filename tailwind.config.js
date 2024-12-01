/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#6741D9",
        secondary: "#1e2d47",
        warning: "#F7C600",
        danger: "#DC3545",
        success: "#28A745",
        "dark-100": "#E1D5D5",
        "dark-300": "#55595D",
        "dark-400": "#2B3035",
        "dark-500": "#212529",
      },
    },
  },
  safelist: ["bg-primary", "bg-danger", "bg-success"],
  plugins: [],
};
