// store for explore page
export const state = () => ({
  transactions: [],
})

export const mutations = {
  ADD_TRANSACTION (state, tx) {
    state.ducks = []
  },
  ADD_TRANSACTION (state, tx) {
    state.ducks = []
  }
}

export const actions = {
  clearDucks(context) {
    context.commit('CLEAR_DUCKS')
  }
}
