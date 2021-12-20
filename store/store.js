import api from '~/helpers/api'
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
  ducks: [],
  userDucks: [],
  tokenOwners: []
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
  },
  SET_TOKEN_OWNERS (state, owners) {
    state.tokenOwners = owners
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
  async fetchTokenOwners (context) {
    const tokenUris = (
      await zilliqa.blockchain.getSmartContractSubState(
        process.env.nfdContract,
        'token_owners'
      )
    ).result.token_owners

    const tokenUrisArr = Object.entries(tokenUris).map((entry) => {
      return { id: entry[0], address: entry[1] }
    })
    console.log(`fetched ${tokenUrisArr.length} owners`)
    context.commit('SET_TOKEN_OWNERS', tokenUrisArr)
  },
  async fetchUserDucks (context, ids) {
    const userDucks = await Promise.all(ids.map(async (id) => ({id, data: await api.fetchDuck(id)}) ))
    console.log(userDucks)
    context.commit('SET_USER_DUCKS', userDucks)
  },
  clearDucks (context) {
    context.commit('CLEAR_DUCKS')
  }
}
