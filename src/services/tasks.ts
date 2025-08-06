import axios from 'axios'
import api from '../utils/api'

const BASE_URL = import.meta.env.VITE_BASE_URL

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
    const response = await axios.delete(`${BASE_URL}/tasks/${id}`)

    return response.data
  },

  async updateTask(id: string, data: unknown) {
    const response = await axios.patch(`${BASE_URL}/tasks/${id}`, data)

    return response.data
  },

  async completeTask(id: string, data: unknown) {
    const response = await axios.post(`${BASE_URL}/complete/${id}`, data)

    return response.data
  },

  async uncompleteTask(id: string) {
    const response = await axios.delete(`${BASE_URL}/completions/${id}`)

    return response.data
  },

  async createTask(data: unknown) {
    const response = await axios.post(`${BASE_URL}/tasks`, data)

    return response.data
  },
}
