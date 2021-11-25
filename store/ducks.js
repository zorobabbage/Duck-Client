import { Zilliqa } from '@zilliqa-js/zilliqa'

function getRpcUrl (network) {
  const rpcUrl =
    network === 'mainnet'
      ? 'https://api.zilliqa.com'
      : 'https://dev-api.zilliqa.com'

  return rpcUrl
}

const zilliqa = new Zilliqa(getRpcUrl('mainnet'))

export const state = () => ({
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
  async fetchDuckUris (context) {
    const tokenUris = (
      await zilliqa.blockchain.getSmartContractSubState(
        '0x06f70655d4AA5819E711563EB2383655449f24E9',
        'token_uris'
      )
    ).result.token_uris
    console.log(tokenUris)
    const duckUris = Object.entries(tokenUris).map((entry) => {
      return { id: entry[0], uri: entry[1] }
    })
    context.commit('SET_DUCK_URIS', duckUris)
  }
}
