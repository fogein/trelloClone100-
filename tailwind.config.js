/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        taskColor: '#a8a5a5',
      },
    },
  },
  plugins: [],
};
