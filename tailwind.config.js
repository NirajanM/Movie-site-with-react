/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pahelo: "#FFDF2B"
      },
      aspectRatio: {
        'poster': '1 / 1.5',
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}