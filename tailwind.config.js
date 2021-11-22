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
        },
        grass: {
          footer: '#233727',
          background: '#9DD380',
          foreground: '#C0E37A',
          muted: '#3C4B33'
        },
        sky: '#90EBD0'
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
