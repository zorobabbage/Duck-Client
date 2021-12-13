export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  env: {
    nfdContract: process.env.NFD_CONTRACT,
    zilliqaNetwork: process.env.ZILLIQA_NETWORK,
    apiAddress: process.env.API
  },
  
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Duck',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Disrupt, Buidl, Scale.'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap", }
    
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/breakpoint.client.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: ['~/components', '~/components/sections', '~/components/base']
  },
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config.node = {
        fs: 'empty'
      }
    }
  },
  server: {
    host: '0.0.0.0'
  }
}
