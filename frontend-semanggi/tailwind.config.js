/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sg: {
          DEFAULT: '#6DBE45',
          dark: '#4A9A2F',
          light: '#8FD96A',
        },
        darkbg: {
          DEFAULT: '#121417',
          card: '#1A1D24',
          surface: '#24272C',
        },
        gold: {
          DEFAULT: '#C8A42B',
          dark: '#A68A22',
          light: '#E0C060',
        },
        teal: {
          DEFAULT: '#2DD4BF',
          dark: '#0F766E',
          light: '#5EEAD4',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
