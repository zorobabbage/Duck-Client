import * as ZilMiddleware from '../middleware/zilliqa'

export const state = () => ({
  wallet: {
    bech32: '',
    base16: '',
    isConnected: false
  },
  userDucks: [],
  oldUserDucks: [],
  duckPrice: {
    zil: 0,
    usd: 0
  },
  balance: 0
})

export const mutations = {
  SET_WALLET(state, params) {
    state.wallet = { ...state.wallet, ...params }
  },
  SET_DUCK_PRICE (state, params) {
    state.duckPrice = params
  },
  SET_BALANCE(state, bal) {
    state.balance = bal
  }
}
 

export const actions = {
  setWallet(context, params) {
    context.commit('SET_WALLET', params)
  },
  setDuckPrice (context, params) {
    context.commit('SET_DUCK_PRICE', params)
  },
  async fetchBalance(context, address) {
    const balance = await ZilMiddleware.getBalance(address)
    console.log(balance)
    context.commit('SET_BALANCE', balance)
  }
}
