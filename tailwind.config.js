/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#003049',
      secondary: '#d62828',
      orange: '#f77f00',
      yellow: '#fcbf49',
      beige: '#eae2b7'
    }
  },
  plugins: []
}
