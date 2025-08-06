import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

export default {
  async get<T = unknown>(uri: string): Promise<T | null> {
    try {
      const response = await axios.get<T>(`${BASE_URL}/${uri}`)

      return response.data
    } catch {
      return null
    }
  },
}
