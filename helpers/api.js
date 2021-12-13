import axios from 'axios'
const baseUrl = process.env.STAGE === 'production' ?  'https://api.duck.community' : 'http://192.168.1.113:4000'

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
