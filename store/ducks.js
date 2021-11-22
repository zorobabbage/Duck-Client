import { Zilliqa } from '@zilliqa-js/zilliqa'

function getRpcUrl (network) {
  const rpcUrl =
    network === 'mainnet'
      ? 'https://api.zilliqa.com'
      : 'https://dev-api.zilliqa.com'

  return rpcUrl
}

const zilliqa = new Zilliqa(getRpcUrl(process.env.zilliqaNetwork))

export const state = () => ({
  currentDate: Date.now(),
  launchDate: Date.UTC(2021, 5, 19, 3),
  duckUris: []
})

export const mutations = {
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
  async fetchDuckUris (context) {
    const tokenUris = (
      await zilliqa.blockchain.getSmartContractSubState(
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
