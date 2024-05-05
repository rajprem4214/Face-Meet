/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/public/assets/hero-background.png')",
      },
    },
  },
  plugins: [],
}

