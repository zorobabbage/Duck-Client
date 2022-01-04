export const state = () => ({
  wallet: {
    bech32: '',
    base16: '',
    isConnected: false
  },
  userDucks: [],
  duckPrice: {
    zil: 0,
    usd: 0
  }
})

export const mutations = {
  SET_WALLET(state, params) {
    state.wallet = { ...state.wallet, ...params }
  },
  SET_DUCK_PRICE (state, params) {
    state.duckPrice = params
  }
}

export const actions = {
  setWallet(context, params) {
    context.commit('SET_WALLET', params)
  },
  getZilpay(context) {
    console.log(window.zilPay)
  },
  setDuckPrice (context, params) {
    context.commit('SET_DUCK_PRICE', params)
  }
}
