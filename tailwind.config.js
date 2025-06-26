/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {

        'primary': '#0f62fe',
        'primary-hover': '#0353e9',


        'background': '#161616',
        'surface': '#262626',

        'text-primary': '#f4f4f4',
        'text-secondary': '#c6c6c6',
        'text-placeholder': '#6f6f6f',


        'danger': '#da1e28',
        'success': '#24a148',
        'warning': '#f1c21b',
      },
      boxShadow: {

        'top': '0 -4px 6px -1px rgb(0 0 0 / 0.1), 0 -2px 4px -2px rgb(0 0 0 / 0.1)',
      }
    },
  },
  plugins: [],
}