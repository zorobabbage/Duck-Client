// store for explore page
export const state = () => ({
  ducks: [],
  userDucks: []
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
  SET_USER_DUCKS (state, newDucks) {
    newDucks.forEach((duck) => {
      const exists = state.userDucks.find(x => x.id === duck.id)
      if (!exists) {
        state.userDucks.push(duck)
      }
    })
  },
  CLEAR_DUCKS (state) {
    state.ducks = []
  }
}

export const actions = {
  async fetchDucks (context, params) {
    const result = await this.$axios.$get('/ducks', {params} )
    context.commit('SET_DUCKS', result.resultDucks)
    return result.ducksInSearch
  },

  async fetchUserDucks (context, wallet) {
    const userDucks = await this.$axios.$get('/ducks',{ params: { owner: wallet }})
    context.commit('SET_USER_DUCKS', userDucks.resultDucks)
    return userDucks.ducksInSearch
  },

  clearDucks (context) {
    context.commit('CLEAR_DUCKS')
  },

  
}
