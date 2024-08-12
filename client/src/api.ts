import axios from 'axios';

const API_URL = 'https://profile-fyi-assignment.onrender.com';

export const api = axios.create({
  baseURL: API_URL,
});

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  delete api.defaults.headers.common['Authorization'];
};

export const login = async (email: string, password: string) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const register = async (email: string, password: string) => {
  const response = await api.post('/register', { email, password });
  return response.data;
};

export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

export const fetchUser = async (token: string) => {
  const response = await api.get('/getUser', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  );
  return response.data;
};