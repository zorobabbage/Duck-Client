import axios from 'axios'

const baseUrl = process.env.apiAddress || 'https://api.duck.community'

async function fetchMultipleDucks (params) {
  const response = await axios.get(`${baseUrl}/ducks`, { params })
  return response.data
}

async function fetchDuck (id) {
  const response = await axios.get(`${baseUrl}/duck/${id}`)
  return response.data
}

async function getAttributeCounts () {
  const response = await axios.get(`${baseUrl}/attributes`)
  return response.data
}

export default {
  fetchMultipleDucks,
  fetchDuck,
  getAttributeCounts
}
