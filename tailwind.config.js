/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          400: '#FBBF24',
          500: '#F59E0B',
        },
        gray: {
          400: '#9CA3AF',
          500: '#6B7280',
          800: '#1F2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
}
