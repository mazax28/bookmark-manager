// src/api/authApi.js

import { ColumnOrdering } from '@tanstack/react-table';
import axios from 'axios'; // o fetch, como prefieras
axios.defaults.withCredentials = true; // Para enviar cookies con las peticiones

const API_URL = 'http://localhost:8000/api/folders'; // O ponerlo en env vars

export async function getFolders() {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
}
export async function getFoldersWithBoomarks() {
  const response = await axios.get(`${API_URL}/bookmarks`);
  console.log(response.data)
  return response.data;
}

export async function addFolder(data) {
  const {name, color} = data;
  const response = await axios.post(`${API_URL}/`, {
    name,
    color
  }
  );
  return response.data;
}
export async function updateFolder(data) {
    const {id, name, color} = data;
    const response = await axios.put(`${API_URL}/${id}`, {
      name,
      color
    }
    );
    return response.data;
  }

export async function deleteFolder(data) {
    const {id} = data;
    const response = await axios.put(`${API_URL}/${id}`);
    return response.data;
}
