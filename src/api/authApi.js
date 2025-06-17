// src/api/authApi.js

import axios from 'axios'; // o fetch, como prefieras
axios.defaults.withCredentials = true; // Para enviar cookies con las peticiones

const API_URL = import.meta.env.VITE_API_URL


export async function loginUser(data) {
  const { email, password } = data;
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
}

export async function registerUser(data) {
    const { name, email, password } = data;
  const response = await axios.post(`${API_URL}/auth/register`, {
    name,
    email,
    password,
  });
  return response.data;
}
export async function verifyEmail(data) {
  const {token} = data
  const response = await axios.post(`${API_URL}/auth/verify-email`, {
    token
  });
  return response.data;
}

export async function logoutUser() {
  const response = await axios.post(`${API_URL}/auth/logout`);
  return response.data;
}
