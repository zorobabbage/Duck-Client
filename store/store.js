import api from '~/mixins/api'
// import { fetchMultipleDucks } from '~/mixins/api'

export const state = () => ({
  ducks: []
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
  CLEAR_DUCKS (state) {
    state.ducks = []
  }
}

export const actions = {
  async fetchDucks (context, params) {
    console.log(`fetch ducks ${params.from} to ${params.to} with ${JSON.stringify(params)}`)
    const result = (await api.fetchMultipleDucks(params))
    console.log(result)
    context.commit('SET_DUCKS', result.resultDucks)
    return result.ducksInSearch
  },
  clearDucks (context) {
    context.commit('CLEAR_DUCKS')
  }
}
