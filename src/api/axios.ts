import axios from 'axios';
import { useStore } from '../store';

const api = axios.create({ baseURL: 'http://localhost:8080/api' });

api.interceptors.request.use((config) => {
  const accessToken = useStore.getState().auth.accessToken;
  const token = accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
