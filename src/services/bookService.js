import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

export const getBooks = async () => {
  return api.get('/books');
};

export const addBook = async (bookData) => {
  return api.post('/books', bookData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateBook = async (id, bookData) => {
  return api.put(`/books/${id}`, bookData);
};

export const deleteBook = async (id) => {
  return api.delete(`/books/${id}`);
};

export const getBookById = async (id) => {
  return api.get(`/books/${id}`);
};

export const searchBooks = async (query) => {
  try {
    const response = await api.get(`/search`, { params: { query } });
    return response.data;
  } catch (error) {
    console.error('Error searching books:', error.response || error);
    throw error;
  }
};