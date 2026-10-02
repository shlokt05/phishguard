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
        tactical: {
          bg: '#0A0E17',
          card: '#131B2A',
          border: 'rgba(255, 255, 255, 0.08)',
          subtle: '#1E293B',
          accent: '#10B981',
          threat: '#EF4444'
        },
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22'
        },
        shield: {
          light: '#34d399',
          DEFAULT: '#10b981',
          dark: '#047857'
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
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s infinite',
        'float': 'float 4s ease-in-out infinite'
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(16, 185, 129, 0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(16, 185, 129, 0.6)' }
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
