import api from '~/helpers/api'

export const state = () => ({
  ducks: [],
  currentDuck: 1,
  attributeCounts: {}
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
  }
}

export const actions = {
  async fetchDucks (context, params) {
    const result = (await api.fetchMultipleDucks(params)).resultDucks
    context.commit('SET_DUCKS', result)
  },
  async fetchCurrentDuck (context) {
    context.commit('SET_CURRENT_DUCK', 3960)
  },
  async getAttributeCounts (context) {
    const result = await api.getAttributeCounts()
    context.commit('SET_ATTRIBUTE_COUNTS', result)
  }
}
