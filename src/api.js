import axios from 'axios';

const API_URL = 'http://localhost:5000/books';

export const getBooks = () => axios.get(API_URL); // works
export const addBook = (book) => axios.post(API_URL, book); // works
export const updateBook = (book) => axios.put(`${API_URL}/${book._id}`, book); // works
export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`); // works
