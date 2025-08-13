import axios from 'axios'
import api from '@/utils/api'
import localStorageService from '@/services/localStorage'

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
  async getTasks() {
    const accessToken = localStorageService.getAccessToken()

    try {
      const response = await api.get<Task[]>('api/tasks', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      return { data: response.data }
    } catch (error) {
      console.error('Failed to fetch tasks:', error)
      return { error }
    }
  },

  async getTask(id: string) {
    const accessToken = localStorageService.getAccessToken()

    try {
      const response = await api.get<Task>(`api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      return { data: response.data }
    } catch (error) {
      console.error('Failed to get task:', error)
      return { error }
    }
  },

  async deleteTask(id: string) {
    const accessToken = localStorageService.getAccessToken()

    try {
      const response = await api.delete(`api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      return { data: response.data }
    } catch (error) {
      console.error('Failed to delete task:', error)
      return { error }
    }
  },

  async updateTask(id: string, data: unknown) {
    const accessToken = localStorageService.getAccessToken()

    try {
      const response = await axios.patch(`${API_URL}/api/tasks/${id}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      return { data: response.data }
    } catch (error) {
      console.error('Failed to update task:', error)
      return { error }
    }
  },

  async completeTask(id: string, data: unknown) {
    const accessToken = localStorageService.getAccessToken()

    try {
      const response = await axios.post(`${API_URL}/api/complete/${id}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      return { data: response.data }
    } catch (error) {
      console.error('Failed to complete task:', error)
      return { error }
    }
  },

  async uncompleteTask(id: string) {
    const accessToken = localStorageService.getAccessToken()

    try {
      const response = await axios.delete(`${API_URL}/api/uncomplete/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      return { data: response.data }
    } catch (error) {
      console.error('Failed to uncomplete task:', error)
      return { error }
    }
  },

  async createTask(data: unknown) {
    const accessToken = localStorageService.getAccessToken()

    try {
      const response = await axios.post(`${API_URL}/api/tasks`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      return { data: response.data }
    } catch (error) {
      console.error('Failed to create task:', error)
      return { error }
    }
  },
}
