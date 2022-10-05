
export function getApiUrl () {
  const network = process.env.zilliqa_network
  switch (network) {
    case 'testnet': {
      return process.env.testnet_api_url 
    }
    case 'mainnet': {
      return process.env.mainnet_api_url
    }
    default: throw new Error('Invalid network')
  }
}



export default {
  // Target: https://go.nuxtjs.dev/config-target
  //target: 'static',
  ssr: true,
  env: {
    zilliqa_network: process.env.zilliqa_network,

    //mainnet
    mainnet_token_contract: process.env.mainnet_token_contract,
    mainnet_proxy_contract: process.env.mainnet_proxy_contract,
    mainnet_zrc1_contract: process.env.mainnet_zrc1_contract,
    mainnet_zrc6_contract: process.env.mainnet_zrc6_contract,
    mainnet_migrator_contract: process.env.mainnet_migrator_contract,
    mainnet_rewards_contract: process.env.mainnet_rewards_contract,
    mainnet_api_url: process.env.mainnet_api_url,
    mainnet_voucher_contract: process.env.mainnet_voucher_contract,
    mainnet_ownership_contract: process.env.mainnet_ownership_contract,

    //testnet
    testnet_token_contract: process.env.testnet_token_contract,
    testnet_proxy_contract: process.env.testnet_proxy_contract,
    testnet_zrc1_contract: process.env.testnet_zrc1_contract,
    testnet_zrc6_contract: process.env.testnet_zrc6_contract,
    tesntet_migrator_contract : process.env.tesntet_migrator_contract ,
    testnet_rewards_contract : process.env.testnet_rewards_contract ,
    testnet_api_url : process.env.testnet_api_url ,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Duck - Non Fungible Ducks',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Home of the Non Fungible Ducks as well as all projects by the Duck team.'
      },
      { 
        hid: 'og:image', 
        property: 'og:image', 
        content: '/meta-preview.png'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700;800&display=swap", }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/breakpoint.client.js',
    '~/plugins/changeToast.js'],

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
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxt/content'
  ],

  axios: {
    baseURL: getApiUrl()
  },

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
