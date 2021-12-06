import api from '~/mixins/api'

const apiURL = 'http://localhost:4000'

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
  }
}

export const actions = {
  async fetchDucks (context, data) {
    let query = `${apiURL}/ducks?from=${data.from}&to=${data.to}`
    if (data.options) {
      query += `&${data.options}`
    }
    console.log(query)
    const result = (await api.get(query)).data
    context.commit('SET_DUCKS', result)
  }
}
