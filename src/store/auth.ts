import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import { StoreGet, StoreSet } from '../store';

export interface User {
  username: string;
  token: string;
  gmail: string;
  contactInfo: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  error: string | null;
}

export interface AuthActions {
  setAccessToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<string>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

export const initialAuth: AuthState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : null,
  accessToken: localStorage.getItem('accessToken') || null,
  error: null,
};

export function authActions(set: StoreSet, get: StoreGet): AuthActions {
  return {
    setAccessToken: (token) => {
      localStorage.setItem('accessToken', token || '');
      set((state) => {
        state.auth.accessToken = token;
      });
    },
    login: async (email: string, password: string) => {
      try {
        const response = await api.post(ENDPOINTS.AUTH.LOGIN(email, password));
        if (response.data) {
          get().setAccessToken(response.data.token);
          // Decode JWT token to get user data
          const base64Url = response.data.token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const decodedToken = JSON.parse(window.atob(base64));
          const user = {
            ...response.data,
            role: decodedToken?.role || 'user',
          };
          localStorage.setItem('user', JSON.stringify(user));
          set((state) => {
            state.auth.user = user;
            state.auth.error = null;
          });
        }
        return 'LOGIN_SUCCESS';
      } catch (error: any) {
        set((state) => {
          state.auth.error = 'Invalid username or password';
        });
        return 'LOGIN_FAILED';
      }
    },
    logout: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      set((state) => {
        state.auth.accessToken = null;
        state.auth.user = null;
      });
    },
    updateProfile: async (userData: Partial<User>) => {
      try {
        const response = await api.put(ENDPOINTS.USER.UPDATE_PROFILE, userData);
        set((state) => {
          if (state.auth.user) {
            state.auth.user = { ...state.auth.user, ...response.data };
          }
        });
      } catch (error: any) {
        set((state) => {
          state.auth.error = error.response?.data?.message || 'Profile update failed';
        });
        throw error;
      }
    },
  };
}
