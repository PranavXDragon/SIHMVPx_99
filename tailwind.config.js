/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: '#2563EB',
        'brand-light': '#EFF6FF',
        'brand-dark': '#1D4ED8',
        success: '#16A34A',
        warning: '#D97706',
        danger: '#DC2626',
        purple: '#7C3AED',
      },
    },
  },
  plugins: [],
};
