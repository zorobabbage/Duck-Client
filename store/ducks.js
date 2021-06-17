export const state = () => ({
  currentDate: Date.now(),
  launchDate: Date.UTC(2021, 5, 18, 23),
  darkmode: undefined
})

export const mutations = {
  SET_CURRENT_DATE (state) {
    state.currentDate = Date.now()
  },
  SET_DARKMODE (state, bool) {
    state.darkmode = bool
  }
}

export const actions = {
  startCurrentDateInterval (context) {
    setInterval(() => {
      context.commit('SET_CURRENT_DATE')
    }, 1000)
  },
  fetchDarkmode (context) {
    const theme = localStorage.getItem('theme')
    if (
      theme === 'dark' ||
      (!(theme) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      context.commit('SET_DARKMODE', true)
      document.documentElement.classList.add('dark')
    } else {
      context.commit('SET_DARKMODE', false)
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', context.state.darkmode ? 'dark' : 'light')
  },
  toggleDarkmode (context) {
    context.commit('SET_DARKMODE', !context.state.darkmode)
    localStorage.setItem('theme', context.state.darkmode ? 'dark' : 'light')
    const classList = document.documentElement.classList
    context.state.darkmode ? classList.add('dark') : classList.remove('dark')
  }
}
