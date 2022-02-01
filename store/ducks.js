const environment = require('@/helpers/environment')
import { Zilliqa } from '@zilliqa-js/zilliqa'
const { MessageType } = require('@zilliqa-js/subscriptions')

import * as ZilMiddleware from '../middleware/zilliqa'

const zilliqa = new Zilliqa(environment.getRpcUrl())



export const state = () => ({
  ducks: [],
  zrc1owners: [],
  zrc1operators: {},
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
  },
  SET_ZRC1_OWNERS (state, owners) {
    state.zrc1owners = owners
  },
  SET_ZRC1_OPERATORS (state, operators) {
    state.zrc1operators = operators
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
    dispatch('fetchZRC1Owners')
    dispatch('fetchZRC1Operators')

    const subscriber = zilliqa.subscriptionBuilder.buildNewBlockSubscriptions(
      environment.getRpcUrl('ws'),
    )
        
    subscriber.emitter.on(MessageType.NEW_BLOCK, () => {
      dispatch('fetchDuckOwners')
      dispatch('fetchTokenOwners')
      dispatch('fetchZRC1Owners')
      dispatch('fetchZRC1Operators')
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

  // zrc1 OLD
  async fetchZRC1Owners ({commit}) {
    const oldTokensArr = await ZilMiddleware.getHeldZRC1Tokens()
    commit('SET_ZRC1_OWNERS', oldTokensArr)
  },

  async fetchZRC1Operators ({commit}) {
    const result = await ZilMiddleware.getZRC1Operators()
    commit('SET_ZRC1_OPERATORS', result)
  },

  //fungible $duck token
  async fetchTokenOwners ({commit}) {
    const tokenOwnersAndAmounts = await ZilMiddleware.getDuckTokenHolders()
    commit('SET_DUCK_TOKEN_OWNER_AMOUNTS', tokenOwnersAndAmounts)
  }
}
