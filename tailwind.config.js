/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'particle': 'particle 2s ease-in-out infinite',
      },
      keyframes: {
        particle: {
          '0%, 100%': {
            transform: 'translateY(0) scale(1)',
            opacity: 0
          },
          '50%': {
            transform: 'translateY(-20px) scale(1.5)',
            opacity: 1
          }
        }
      }
    },
  },
  plugins: [],
};