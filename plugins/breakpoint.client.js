import Vue from 'vue'
import tailwindConfig from '~/tailwind.config'

const screens = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  ...tailwindConfig.theme.screens
}
const getBreakpoint = (width) => {
  if (width >= screens['2xl']) return '2xl'
  if (width >= screens.xl) return 'xl'
  if (width >= screens.lg) return 'lg'
  if (width >= screens.md) return 'md'
  return 'sm'
}

const debounce = function (func, wait) {
  let timeout
  return () => {
    const later = function () {
      timeout = null
    }
    const callNow = !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func()
  }
}

const breakpoint = Vue.observable({
  w: window.innerWidth,
  h: window.innerHeight,
  is: getBreakpoint(window.innerWidth)
})

window.addEventListener(
  'resize',
  debounce(() => {
    breakpoint.w = window.innerWidth
    breakpoint.h = window.innerHeight
    breakpoint.is = getBreakpoint(window.innerWidth)
  }, 10),
  false
)

export default ({ app }, inject) => {
  inject('breakpoint', breakpoint)
}
