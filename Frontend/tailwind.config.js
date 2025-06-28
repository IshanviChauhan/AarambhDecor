/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'screen-2xl': '1600px', 
        'custom-1200': '1200px', 
        'custom-900': '900px', 
      },
      animation: {
        'fade-in-out': 'fadeInOut 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInOut: {
          '70%, 100%': { opacity: 0.3 },
          '80%': { opacity: 1 },
        },
      },
      colors: {
        'primary': '#E5989B',
        'primary-dark': '#B5838D',
        'primary-light': '#FFCDB2',
        'text-dark': '#0f172a',
        'text-light': '#6D6875',
        'extra-light': '#FFF1E6',
        'primary-light-light': '#FFB4A2',
      }
      
    },
  },
  plugins: [],
}
