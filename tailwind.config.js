const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        zilliqa: 'rgba(41, 204, 196, 1)',
        duck: {
          yellow: '#FDC70C',
          blue: {
            light: '#BAE8FA',
            DEFAULT: '#85D0EF',
            dark: '#8AD5F4',
            1: 'rgb(15, 124, 164)',
            2: 'rgb(21, 159, 216)',
            3: 'rgb(10, 110, 150)',
            4: 'rgb(90, 176, 209)',
            5: 'rgb(16, 171, 212)'
          }
        }
      },
      fontFamily: {
        sans: ['Quicksand', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
