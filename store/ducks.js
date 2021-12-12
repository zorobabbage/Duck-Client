import api from '~/mixins/api'
// import { fetchMultipleDucks } from '~/mixins/api'

export const state = () => ({
  ducks: [],
  currentDuck: 1
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
  }
}

export const actions = {
  async fetchDucks (context, params) {
    const result = (await api.fetchMultipleDucks(params)).resultDucks
    context.commit('SET_DUCKS', result)
  },
  async fetchCurrentDuck (context) {
    context.commit('SET_CURRENT_DUCK', 3960)
  }
}
