import axios from 'axios';

import localStorageService from '@/services/localStorage';
import api from '@/utils/api';

const API_URL = import.meta.env.VITE_API_URL;

export interface Completion {
  completed_at: string; // ISO Date string (YYYY-MM-DD)
  created_at: string; // ISO DateTime string
  id: number;
  task_id: number;
  updated_at: string; // ISO DateTime string
}

export interface Task {
  completions: Completion[];
  created_at: string; // ISO DateTime string
  frequency: number;
  id: number;
  title: string;
  updated_at: string; // ISO DateTime string
}

export default {
  async completeTask(id: string, data: unknown) {
    const accessToken = localStorageService.getAccessToken();

    try {
      const response = await axios.post(`${API_URL}/api/complete/${id}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return { data: response.data };
    } catch (error) {
      console.error('Failed to complete task:', error);
      return { error };
    }
  },

  async createTask(data: unknown) {
    const accessToken = localStorageService.getAccessToken();

    try {
      const response = await axios.post(`${API_URL}/api/tasks`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return { data: response.data };
    } catch (error) {
      console.error('Failed to create task:', error);
      return { error };
    }
  },

  async deleteTask(id: string) {
    const accessToken = localStorageService.getAccessToken();

    try {
      const response = await api.delete(`api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return { data: response.data };
    } catch (error) {
      console.error('Failed to delete task:', error);
      return { error };
    }
  },

  async getTask(id: string) {
    const accessToken = localStorageService.getAccessToken();

    try {
      const response = await api.get<Task>(`api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return { data: response.data };
    } catch (error) {
      console.error('Failed to get task:', error);
      return { error };
    }
  },

  async getTasks() {
    const accessToken = localStorageService.getAccessToken();

    try {
      const response = await api.get<Task[]>('api/tasks', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return { data: response.data };
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      return { error };
    }
  },

  async uncompleteTask(id: string) {
    const accessToken = localStorageService.getAccessToken();

    try {
      const response = await axios.delete(`${API_URL}/api/uncomplete/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return { data: response.data };
    } catch (error) {
      console.error('Failed to uncomplete task:', error);
      return { error };
    }
  },

  async updateTask(id: string, data: unknown) {
    const accessToken = localStorageService.getAccessToken();

    try {
      const response = await axios.patch(`${API_URL}/api/tasks/${id}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return { data: response.data };
    } catch (error) {
      console.error('Failed to update task:', error);
      return { error };
    }
  },
};
