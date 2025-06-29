/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      fontFamily: {
        sans: ['"PT Sans"', 'sans-serif'],
        heading: ['"Playfair Display"', 'serif'],
        numeric: ['"PT Sans"', 'sans-serif'], // Specific font for numeric content
      },
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
        'primary-dark': '#da627d',
        'primary-light': '#FFB4A2',
        'text-dark': '#0f172a', 
        'text-light': '#B5828C', 
        'extra-light': '#F5E1D7',
        'primary-light-light': '#F5E1D7',
      }
      
    },
  },
  plugins: [],
}
