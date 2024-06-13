import axios from 'axios';

const API_URL = 'http://localhost:5000/books';

export const getBooks = () => axios.get(API_URL); // works
export const addBook = (book) => axios.post(API_URL, book); // problem-issue
export const updateBook = (book) => axios.put(`${API_URL}/${book._id}`, book); // problem-issue
export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`); // works
