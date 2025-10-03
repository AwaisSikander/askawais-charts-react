/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui"] },
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9ebff",
          200: "#b7d7ff",
          300: "#88bcff",
          400: "#5a9bff",
          500: "#377dff",
          600: "#1f61eb",
          700: "#1a4bbd",
          800: "#183f96",
          900: "#193872",
        },
      },
    },
  },
  plugins: [],
};
