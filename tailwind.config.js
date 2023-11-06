module.exports = {
  mode: "jit",
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage:{
        'farmer-preview':"url(/src/static/farmer/bg.png)",
        'bglines': "url(/src/static/farmer/bglines.png)"
      }
    },
    fontFamily: {
      Poppins: ['Poppins'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
