import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || undefined;

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (email: string, password: string) => {
  return await api.post('/auth/login', { email, password });
};

export const getMovies = async () => {
  return await api.get('/movies');
};

export default api;
