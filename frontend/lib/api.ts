import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // 例如 https://my-backend.com/api
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api