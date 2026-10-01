/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fb',
          400: '#36a9f7',
          500: '#0c8de4',
          600: '#0270c1',
          700: '#03599d',
          800: '#074c81',
          900: '#0c406c',
          950: '#082847'
        },
        shield: {
          light: '#00f2fe',
          DEFAULT: '#4facfe',
          dark: '#005bea'
        },
        danger: {
          500: '#ef4444',
          600: '#dc2626'
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706'
        },
        success: {
          500: '#10b981',
          600: '#059669'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s infinite',
        'float': 'float 4s ease-in-out infinite'
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(54, 169, 247, 0.4)' },
          '50%': { boxShadow: '0 0 25px rgba(54, 169, 247, 0.8)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
}
