// src/api/authApi.js

import axios from 'axios'; // o fetch, como prefieras
axios.defaults.withCredentials = true; // Para enviar cookies con las peticiones

const API_URL = 'http://localhost:8000/api/bookmarks'; // O ponerlo en env vars

export async function getBookmarks(filter= 'todos',page=1,limit=10,search='') {
  const response = await axios.get(`${API_URL}/`, {
    params: { 
      filter,
      page,
      limit,
      search
     },
  });
  return response.data;
}
export async function getBookmark(id) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}


export async function addBookmark(data) {
  const {title,description,url,folder,tags} = data;
  const response = await axios.post(`${API_URL}/`,{
    title,
    description,
    url,
    folder,
    tags
  }
  );
  return response.data;
}
export async function updateBookmark(data) {
    const {id,title,description,url,folder,tags} = data;
    const response = await axios.put(`${API_URL}/${id}`,{
      title,
      description,
      url,
      folder,
      tags
    }
    );
    return response.data;
  }

export async function deleteBookmark(data) {
    const {id} = data;
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
}
export async function moveBookmark(data) {
    const {id,folder} = data;
    const response = await axios.put(`${API_URL}/move/${id}`,{
      folder
    }
    );
    return response.data;
}
