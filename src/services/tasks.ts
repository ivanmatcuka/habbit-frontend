import axios from 'axios'
import api from '../utils/api'

const API_URL = import.meta.env.VITE_API_URL

export interface Completion {
  id: number
  task_id: number
  completed_at: string // ISO Date string (YYYY-MM-DD)
  created_at: string // ISO DateTime string
  updated_at: string // ISO DateTime string
}

export interface Task {
  id: number
  title: string
  frequency: number
  created_at: string // ISO DateTime string
  updated_at: string // ISO DateTime string
  completions: Completion[]
}

export default {
  async getTasks(): Promise<Task[]> {
    return (await api.get<Task[]>('tasks')) ?? []
  },

  async getTask(id: string) {
    return await api.get<Task>(`tasks/${id}`)
  },

  async deleteTask(id: string) {
    const response = await axios.delete(`${API_URL}/tasks/${id}`)

    return response.data
  },

  async updateTask(id: string, data: unknown) {
    const response = await axios.patch(`${API_URL}/tasks/${id}`, data)

    return response.data
  },

  async completeTask(id: string, data: unknown) {
    const response = await axios.post(`${API_URL}/complete/${id}`, data)

    return response.data
  },

  async uncompleteTask(id: string) {
    const response = await axios.delete(`${API_URL}/completions/${id}`)

    return response.data
  },

  async createTask(data: unknown) {
    const response = await axios.post(`${API_URL}/tasks`, data)

    return response.data
  },
}
