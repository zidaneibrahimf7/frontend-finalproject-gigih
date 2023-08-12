/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-green': '#29DFB4'
      },
      backgroundSize: ({ theme }) => ({
        auto: 'auto',
        cover: 'cover',
        contain: 'contain',
        ...theme('spacing')
      }),
      colors: {
        'deep-pine': '#1d3c45',
        'orange': '#d2601a',
        'light-peach': '#fff1e1',
        'mango': '#ffc13b'
      }
    },
  },
  plugins: [],
}