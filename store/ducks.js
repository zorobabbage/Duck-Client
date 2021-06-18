export const state = () => ({
  currentDate: Date.now(),
  launchDate: Date.UTC(2021, 5, 20, 2),
  darkmode: undefined,
  duckUris: []
})

export const mutations = {
  SET_CURRENT_DATE (state) {
    state.currentDate = Date.now()
  },
  SET_DARKMODE (state, bool) {
    state.darkmode = bool
  },
  SET_DUCK_IDS (state, ids) {
    state.duckIds = [...state.duckIds, ...ids]
  },
  SET_DUCK_URIS (state, uris) {
    state.duckUris = [...state.duckUris, ...uris]
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
      (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
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
  },
  async fetchDuckUris (context) {
    const tokenUris = (
      await window.zilPay.blockchain.getSmartContractSubState(
        process.env.nfdContract,
        'token_uris'
      )
    ).result.token_uris
    const duckUris = Object.entries(tokenUris).map((entry) => {
      return { id: entry[0], uri: entry[1] }
    })
    context.commit('SET_DUCK_URIS', duckUris)
  }
}
