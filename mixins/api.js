import axios from 'axios'
const baseUrl = 'http://api.duck.community'

async function fetchMultipleDucks (params) {
  const response = await axios.get(`${baseUrl}/ducks`, { params })
  return response.data
}

async function fetchDuck (id) {
  console.log(`${baseUrl}/duck/${id}`)
  const response = await axios.get(`${baseUrl}/duck/${id}`)
  return response.data
}

export default {
  fetchMultipleDucks,
  fetchDuck
}
