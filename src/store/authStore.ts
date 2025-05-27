import { create } from 'zustand';

import api from '../api/axios';
import ENDPOINTS from '../api/endpoints';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem('accessToken'),
  setAccessToken: (token) => {
    localStorage.setItem('accessToken', token || '');
    set({ accessToken: token });
  },
  login: async (email: string, password: string) => {
    const loginRequest = { email, password };
    const response = await api.post(ENDPOINTS.AUTH.LOGIN, loginRequest);
    return response.data;
  },
}));

export default useAuthStore;
