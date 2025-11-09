/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto-Regular'],
        robotoBold: ['Roboto-Bold'],
      },
    },
  },
  plugins: [],
};
