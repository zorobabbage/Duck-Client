export const state = () => ({
  wallet: {
    bech32: '',
    base16: '',
    isConnected: false
  },
  userDucks: []
})

export const mutations = {
  SET_WALLET(state, params) {
    state.wallet = { ...state.wallet, ...params }
  }
}

export const actions = {
  setWallet(context, params) {
    context.commit('SET_WALLET', params)
  },
  getZilpay(context) {
    console.log(window.zilPay)
  }
}
