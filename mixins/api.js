import axios from 'axios'

export default axios.create({
  baseURL: 'https://localhost:4000/',
  headers: {
    'Content-type': 'application/json'
  }
})
