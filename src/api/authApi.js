// src/api/authApi.js

import axios from 'axios'; // o fetch, como prefieras

const API_URL = 'http://localhost:8000/api/auth'; // O ponerlo en env vars

export async function loginUser(data) {
  const { email, password } = data;
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  return response.data;
}

export async function registerUser(data) {
    const { name, email, password } = data;
  const response = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
  });
  return response.data;
}
export async function verifyEmail(data) {
  const {token} = data
  const response = await axios.post(`${API_URL}/verify-email`, {
    token
  });
  return response.data;
}
