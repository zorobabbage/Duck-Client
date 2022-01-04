import { Zilliqa } from '@zilliqa-js/zilliqa'
const { MessageType } = require('@zilliqa-js/subscriptions')

import * as ZilMiddleware from '../middleware/zilliqa'

function getRpcUrl (network) {
  switch(network.toLowerCase()) {
    case 'mainnet':
      return 'https://api.zilliqa.com'
    case 'testnet':
      return 'https://dev-api.zilliqa.com'
    default :
      return'https://api.zilliqa.com'
  }
}

const zilliqa = new Zilliqa(getRpcUrl(process.env.zilliqaNetwork))



export const state = () => ({
  ducks: [],
  currentDuck: 1,
  attributeCounts: {},
  duckOwners: [],
  duckTokenOwnerAmounts: {}
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
  SET_DUCK_OWNERS (state, owners) {
    state.duckOwners = owners
  },
  SET_DUCK_TOKEN_OWNER_AMOUNTS (state, owners) {
    state.duckTokenOwnerAmounts = owners
  }
}

export const actions = {
  async fetchDucks (context, params) {
    const result = await this.$axios.$get('/ducks', { params })
    context.commit('SET_DUCKS', result.resultDucks)
  },
  async getAttributeCounts (context) {
    const result = await this.$axios.$get('/attributes')
    context.commit('SET_ATTRIBUTE_COUNTS', result)
  },

  // ======================================================

  async mainGetBlock({ dispatch }) {
    dispatch('fetchDuckOwners')
    dispatch('fetchTokenOwners')

    const subscriber = zilliqa.subscriptionBuilder.buildNewBlockSubscriptions(
      'wss://api-ws.zilliqa.com',
    )
        
    subscriber.emitter.on(MessageType.NEW_BLOCK, () => {
      dispatch('fetchDuckOwners')
      dispatch('fetchTokenOwners')
    })
    
    await subscriber.start()
  },

  // non fungible owners
  async fetchDuckOwners ({ commit }) {
    const tokenUrisArr = await ZilMiddleware.getDuckHolders()

    console.log(`fetched ${tokenUrisArr.length} ducks`)
    commit('SET_DUCK_OWNERS', tokenUrisArr)  
    commit('SET_CURRENT_DUCK', tokenUrisArr.length)
  },

  //fungible $duck token
  async fetchTokenOwners ({commit}) {
    const tokenOwnersAndAmounts = await ZilMiddleware.getDuckTokenHolders()
    commit('SET_DUCK_TOKEN_OWNER_AMOUNTS', tokenOwnersAndAmounts)
  }
}
