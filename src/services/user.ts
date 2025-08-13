import { AxiosError } from 'axios'
import api from '@/utils/api'
import localStorageService from '@/services/localStorage'

export type UserResponse = {
  id?: number
  name: string
  email: string
  password?: string
  remember_token?: string | null
  email_verified_at?: string | null
  created_at?: string
  updated_at?: string
}

export type LoginResponse = {
  access_token: string
  token_type: string
  user: User
  status: string
}

export type User = Pick<UserResponse, 'id' | 'name' | 'email' | 'created_at' | 'updated_at'>

export default {
  async getUser() {
    const accessToken = localStorageService.getAccessToken()

    try {
      const response = await api.get<UserResponse>('api/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      return { data: response.data }
    } catch (error) {
      console.error('Error fetching user:', error)
      return { error: 'Failed to fetch user. Details: ' + (error as AxiosError).message }
    }
  },

  async signIn(email: string, password: string) {
    try {
      const csrfToken = await this.csrfToken()
      const response = await api.post<LoginResponse>(
        'api/login',
        { email, password },
        {
          headers: {
            'X-XSRF-TOKEN': csrfToken,
          },
        },
      )

      return { data: response.data }
    } catch (error) {
      console.error('Error signing in:', error)

      const { code, response } = error as AxiosError<{
        errors?: Record<string, string[]>
        message?: string
      }>

      const errors = response?.data ? response.data.errors : undefined
      const message = response?.data ? response.data.message : undefined

      return {
        error: {
          message,
          code,
          errors,
        },
      }
    }
  },

  async signUp(name: string, email: string, password: string, confirmPassword: string) {
    try {
      const csrfToken = await this.csrfToken()
      const response = await api.post<LoginResponse>(
        'api/register',
        { name, email, password, password_confirmation: confirmPassword },
        {
          headers: {
            'X-XSRF-TOKEN': csrfToken,
          },
        },
      )

      return { data: response.data }
    } catch (error) {
      console.error('Error signing up:', error)

      const { code, response } = error as AxiosError<{
        errors?: Record<string, string[]>
        message?: string
      }>

      const errors = response?.data ? response.data.errors : undefined
      const message = response?.data ? response.data.message : undefined

      return {
        error: {
          message,
          code,
          errors,
        },
      }
    }
  },

  async csrfToken() {
    return await api.get('sanctum/csrf-cookie')
  },
}
