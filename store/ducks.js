import { Zilliqa } from '@zilliqa-js/zilliqa'
const { MessageType } = require('@zilliqa-js/subscriptions')

function getRpcUrl (network) {
  const rpcUrl =
    network === 'mainnet'
      ? 'https://api.zilliqa.com'
      : 'https://dev-api.zilliqa.com'

  return rpcUrl
}

const zilliqa = new Zilliqa(getRpcUrl(process.env.zilliqaNetwork))



export const state = () => ({
  ducks: [],
  currentDuck: 1,
  attributeCounts: {},
  tokenOwners: []
})

export const mutations = {
  SET_DUCKS (state, newDucks) {
    newDucks.forEach((duck) => {
      const exists = state.ducks.find(x => x.id === duck.id)
      if (!exists) {
        state.ducks.push(duck)
      }
    })
  },
  SET_CURRENT_DUCK (state, currentDuck) {
    state.currentDuck = currentDuck
  },
  SET_ATTRIBUTE_COUNTS (state, obj) {
    state.attributeCounts = obj
  },
  SET_TOKEN_OWNERS (state, owners) {
    state.tokenOwners = owners
  }
}

export const actions = {
  async fetchDucks (context, params) {
    const result = await this.$axios.$get('/ducks', { params })
    context.commit('SET_DUCKS', result.resultDucks)
  },
  async setCurrentDuck (context, ducks) {
    context.commit('SET_CURRENT_DUCK', ducks)
  },
  async getAttributeCounts (context) {
    const result = await this.$axios.$get('/attributes')
    context.commit('SET_ATTRIBUTE_COUNTS', result)
  },

  async mainGetBlock({ commit, dispatch }) {
    console.log('get blocks')
    dispatch('fetchTokenOwners')

    
    const subscriber = zilliqa.subscriptionBuilder.buildNewBlockSubscriptions(
      'wss://api-ws.zilliqa.com',
    )
        
    subscriber.emitter.on(MessageType.NEW_BLOCK, () => {
      dispatch('fetchTokenOwners')
    })
    
    await subscriber.start()
  },

  async fetchTokenOwners ({ commit, dispatch }) {
    const tokenUris = (
      await zilliqa.blockchain.getSmartContractSubState(
        process.env.nfdContract,
        'token_owners'
      )
    ).result.token_owners

    const tokenUrisArr = Object.entries(tokenUris).map((entry) => {
      return { id: entry[0], address: entry[1] }
    })
    console.log(`fetched ${tokenUrisArr.length} ducks`)
    commit('SET_TOKEN_OWNERS', tokenUrisArr)  
    dispatch('setCurrentDuck', tokenUrisArr.length)
  },
}
