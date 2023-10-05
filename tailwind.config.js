module.exports = {
  mode: "jit",
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      Montserrat: ['Montserrat'],
      Gabarito: ['Gabarito'],
      Opensans: ['Open Sans'],
      Roboto: ['Roboto'],
      Oswald: ['Oswald'],
      Bebasneue: ['Bebas Neue'],
      Merriweather: ['Merriweather'],
      YanoneKaffeesatz: ['Yanone Kaffeesatz']
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
