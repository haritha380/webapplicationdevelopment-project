/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', "serif"],
        sans: ['Inter', "ui-sans-serif", "system-ui"]
      },
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d6e9ff",
          200: "#b7d7ff",
          300: "#8ec0ff",
          400: "#5da1ff",
          500: "#3a87ff",
          600: "#1f6dff",
          700: "#1656d1",
          800: "#1547a3",
          900: "#133c85"
        }
      },
      boxShadow: {
        soft: "0 10px 25px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
};
