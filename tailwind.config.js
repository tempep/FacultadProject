/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Roboto']
    },
    extend: {
      colors: {
        'dark-blue':'rgba(17,29,53,255)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy:"class"
    })
  ],
}

