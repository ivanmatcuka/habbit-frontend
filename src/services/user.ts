import { AxiosError } from 'axios';

import localStorageService from '@/services/localStorage';
import api from '@/utils/api';

export type LoginResponse = {
  access_token: string;
  status: string;
  token_type: string;
  user: User;
};

export type RecoverResponse = {
  status: string;
};

export type User = Pick<UserResponse, 'created_at' | 'email' | 'id' | 'name' | 'updated_at'>;

export type UserResponse = {
  created_at?: string;
  email: string;
  email_verified_at?: null | string;
  id?: number;
  name: string;
  password?: string;
  remember_token?: null | string;
  updated_at?: string;
};

export default {
  async csrfToken() {
    return await api.get('sanctum/csrf-cookie');
  },

  async getUser() {
    const accessToken = localStorageService.getAccessToken();

    try {
      const response = await api.get<UserResponse>('api/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return { data: response.data };
    } catch (error) {
      console.error('Error fetching user:', error);
      return { error: 'Failed to fetch user. Details: ' + (error as AxiosError).message };
    }
  },

  async recoverPassword(email: string) {
    try {
      const csrfToken = await this.csrfToken();

      const response = await api.post<RecoverResponse>(
        'api/recover',
        { email },
        {
          headers: {
            'X-XSRF-TOKEN': csrfToken,
          },
        },
      );
      return { data: response.data };
    } catch (error) {
      console.error('Error recovering password:', error);

      const { code, response } = error as AxiosError<{
        errors?: Record<string, string[]>;
        message?: string;
      }>;

      const errors = response?.data ? response.data.errors : undefined;
      const message = response?.data ? response.data.message : undefined;

      return {
        error: {
          code,
          errors,
          message,
        },
      };
    }
  },

  async signIn(email: string, password: string) {
    try {
      const csrfToken = await this.csrfToken();
      const response = await api.post<LoginResponse>(
        'api/login',
        { email, password },
        {
          headers: {
            'X-XSRF-TOKEN': csrfToken,
          },
        },
      );

      return { data: response.data };
    } catch (error) {
      console.error('Error signing in:', error);

      const { code, response } = error as AxiosError<{
        errors?: Record<string, string[]>;
        message?: string;
      }>;

      const errors = response?.data ? response.data.errors : undefined;
      const message = response?.data ? response.data.message : undefined;

      return {
        error: {
          code,
          errors,
          message,
          status: response?.status,
        },
      };
    }
  },

  async signUp(name: string, email: string, password: string, confirmPassword: string) {
    try {
      const csrfToken = await this.csrfToken();
      const response = await api.post<LoginResponse>(
        'api/register',
        { email, name, password, password_confirmation: confirmPassword },
        {
          headers: {
            'X-XSRF-TOKEN': csrfToken,
          },
        },
      );

      return { data: response.data };
    } catch (error) {
      console.error('Error signing up:', error);

      const { code, response } = error as AxiosError<{
        errors?: Record<string, string[]>;
        message?: string;
      }>;

      const errors = response?.data ? response.data.errors : undefined;
      const message = response?.data ? response.data.message : undefined;

      return {
        error: {
          code,
          errors,
          message,
        },
      };
    }
  },
};
