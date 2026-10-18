/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f9f4',
          100: '#e1f2e6',
          200: '#c5e5ce',
          300: '#99d2a9',
          400: '#67b77e',
          500: '#439b5b',
          600: '#327d47',
          700: '#28633a',
          800: '#224f30',
          900: '#1b4129',
          950: '#0c2315',
        },
        cedar: {
          50: '#fbf7f4',
          100: '#f5eee7',
          200: '#e9dacd',
          300: '#d7beaa',
          400: '#c29d84',
          500: '#b18265',
          600: '#9d6d53',
          700: '#835744',
          800: '#6c473a',
          900: '#583c32',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
