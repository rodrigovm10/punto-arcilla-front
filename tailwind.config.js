/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#582F0E',
        secondary: '#7F4F24',
        orange: '#936639',
        alloyOrange: '#A68A64',
        yellow: '#B6AD90'
      }
    }
  },
  plugins: []
}
