import axios from 'axios'
const baseUrl = 'http://192.168.1.113:4000'

async function fetchMultipleDucks (params) {
  const response = await axios.get(`${baseUrl}/ducks`, { params })
  return response.data
}

async function fetchDuck (id) {
  console.log(`${baseUrl}/duck/${id}`)
  const response = await axios.get(`${baseUrl}/duck/${id}`)
  console.log(response.data)
  return response.data
}

export default {
  fetchMultipleDucks,
  fetchDuck
}
