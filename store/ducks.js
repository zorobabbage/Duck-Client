export const state = () => ({
  currentDate: Date.now(),
  launchDate: Date.UTC(2021, 5, 18, 23)
})

export const mutations = {
  SET_CURRENT_DATE (state) {
    state.currentDate = Date.now()
  }
}

export const actions = {
  startCurrentDateInterval (context) {
    setInterval(() => {
      context.commit('SET_CURRENT_DATE')
    }, 1000)
  }
}
