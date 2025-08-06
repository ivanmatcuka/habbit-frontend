import axios from 'axios'

const BASE_URL = 'http://localhost:8000';

export default {
  /**
   * Fetches all tasks.
   *
   * @return {Promise<any>}
   */
  async getTasks() {
    const response = await axios.get(`${BASE_URL}/tasks`);

    return response.data;
  },

  /**
   * Fetches the task.
   *
   * @param {number} id - Task ID.
   * @return {Promise<any>}
   */
  async getTask(id) {
    const response = await axios.get(`${BASE_URL}/tasks/${id}`);

    return response.data;
  },

  /**
   * Deletes the task.
   *
   * @param {number} id - Task ID.
   * @return {Promise<any>}
   */
  async deleteTask(id) {
    const response = await axios.delete(`${BASE_URL}/tasks/${id}`)

    return response.data;
  },

  /**
   * Updates the task.
   *
   * @param {number} id - Task ID.
   * @param {any} data - Task data.
   * @return {Promise<any>}
   */
  async updateTask(id, data) {
    const response = await axios.patch(`${BASE_URL}/tasks/${id}`, data);

    return response.data;
  },

  /**
   * Completes the task.
   */
  async completeTask(id: number, data: unknown) {
    const response = await axios.post(`${BASE_URL}/complete/${id}`, data);

    return response.data;
  },

  /**
   * Uncompletes the task by completion ID.
   *
   * @param {number} id - Completion ID.
   * @return {Promise<any>}
   */
  async uncompleteTask(id) {
    const response = await axios.delete(`${BASE_URL}/completions/${id}`);

    return response.data;
  },

  /**
   * Creates a task.
   *
   * @param {any} data - Task data.
   * @return {Promise<any>}
   */
  async createTask(data) {
    const response = await axios.post(`${BASE_URL}/tasks`, data)

    return response.data;
  },
}
