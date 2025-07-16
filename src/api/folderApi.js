// src/api/authApi.js

import { ColumnOrdering } from '@tanstack/react-table';
import axios from 'axios'; // o fetch, como prefieras
axios.defaults.withCredentials = true; // Para enviar cookies con las peticiones

const API_URL = import.meta.env.VITE_API_URL;

export async function getFolders() {
  const response = await axios.get(`${API_URL}/folders/`);
  return response.data;
}

export async function getFolder(id) {
  const response = await axios.get(`${API_URL}/folders/${id}`);
  return response.data;
}
export async function getFoldersWithBoomarks() {
  const response = await axios.get(`${API_URL}/folders/bookmarks`);
  return response.data;
}
export async function getFoldersHierarchy() {
  const response = await axios.get(`${API_URL}/folders/hierarchy`);
  return response.data.folders;
}

export async function addFolder(data) {
  const {name, color, parentFolder} = data;
  const response = await axios.post(`${API_URL}/folders/`, {
    name,
    color,
    parentFolder
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
    const response = await axios.delete(`${API_URL}/folders/${id}`);
    return response.data;
}
