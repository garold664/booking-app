/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F5385D',
      },
      keyframes: {
        'shadow-pulse': {
          '0%, 100%': {
            'box-shadow': '0 0 5px 0px rgba(250, 0, 0, 0.7)',
          },
          '50%': {
            'box-shadow': '0 0 2px 3px rgba(250, 0, 0, 0.7)',
          },
        },
      },
      animation: {
        'shadow-pulse': 'shadow-pulse 1s ease-in-out infinite',
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
