// src/api/authApi.js

import axios from 'axios'; // o fetch, como prefieras
axios.defaults.withCredentials = true; // Para enviar cookies con las peticiones

const API_URL = import.meta.env.VITE_API_URL


export async function getBookmarks(filter= 'todos',page=1,limit=10,search='') {
  const response = await axios.get(`${API_URL}/bookmarks`, {
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
  const response = await axios.get(`${API_URL}/bookmarks/${id}`);
  return response.data;
}


export async function addBookmark(data) {
  const {title,description,url,folder,tags} = data;
  const response = await axios.post(`${API_URL}/bookmarks/`,{
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
    const response = await axios.put(`${API_URL}/bookmarks/${id}`,{
      title,
      description,
      url,
      folder,
      tags
    }
    );
    return response.data;
}

export async function updateFavorite(data) {
    const {id} = data;
    const response = await axios.patch(`${API_URL}/bookmarks/${id}/favorite`);
    return response.data;
}

export async function deleteBookmark(data) {
    const {id} = data;
    const response = await axios.delete(`${API_URL}/bookmarks/${id}`);
    return response.data;
}
export async function moveBookmark(data) {
    const {id,folder} = data;
    const response = await axios.put(`${API_URL}/bookmarks/move/${id}`,{
      folder
    }
    );
    return response.data;
}
export async function deleteMultipleBookmarks(data) {

  const {ids} = data;
  const response = await axios.post(`${API_URL}/bookmarks/delete-multiple`,{
    ids
  });
  return response.data;
}
