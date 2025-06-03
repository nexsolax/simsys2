import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';
import { StoreGet, StoreSet } from '../store';

export interface User {
  username: string;
  token: string;
  gmail: string;
  contactInfo: string;
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
}

export const initialAuth: AuthState = {
  user: null,
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
          set((state) => {
            state.auth.user = response.data;
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
      set((state) => {
        state.auth.accessToken = null;
        state.auth.user = null;
      });
    },
  };
}
