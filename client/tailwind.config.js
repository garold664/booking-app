/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F5385D',
      },
      // margin: {
      //   1: '0.5rem',
      //   2: '1rem',
      //   3: '1.5rem',
      // },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
  },
  plugins: [],
};
