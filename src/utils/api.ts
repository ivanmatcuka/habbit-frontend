import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export default {
  async get<T = unknown>(uri: string): Promise<T | null> {
    try {
      const response = await axios.get<T>(`${API_URL}/${uri}`)

      return response.data
    } catch {
      return null
    }
  },
}
