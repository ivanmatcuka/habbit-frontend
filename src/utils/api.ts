import axios, { type AxiosResponse } from 'axios'

const API_URL = import.meta.env.VITE_API_URL

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

export default {
  get<T = unknown>(uri: string, options?: Record<string, unknown>): Promise<AxiosResponse<T>> {
    return axios.get<T>(`${API_URL}/${uri}`, {
      headers: {
        ...DEFAULT_HEADERS,
      },
      ...options,
    })
  },

  post<T = unknown>(
    uri: string,
    data: Record<string, unknown>,
    options?: Record<string, unknown>,
  ): Promise<AxiosResponse<T>> {
    return axios.post<T>(`${API_URL}/${uri}`, data, {
      headers: {
        ...DEFAULT_HEADERS,
      },
      ...options,
    })
  },

  delete<T = unknown>(uri: string, options?: Record<string, unknown>): Promise<AxiosResponse<T>> {
    return axios.delete<T>(`${API_URL}/${uri}`, {
      headers: {
        ...DEFAULT_HEADERS,
      },
      ...options,
    })
  },
}
