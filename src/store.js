// src/store.js
import { createStore } from 'vuex';
import { getBooks, addBook, updateBook, deleteBook } from './api';

export default createStore({
  state: {
    books: [],
    currentBook: null,
    isEditing: false
  },
  mutations: {
    SET_BOOKS(state, books) {
      state.books = books;
    },
    SET_CURRENT_BOOK(state, book) {
      state.currentBook = book;
      state.isEditing = true;
    },
    RESET_CURRENT_BOOK(state) {
      state.currentBook = null;
      state.isEditing = false;
    }
  },
  actions: {
    async fetchBooks({ commit }) {
      const response = await getBooks();
      commit('SET_BOOKS', response.data.data);
    },
    async saveBook({ dispatch }, book) {
      if (book._id) {
        await updateBook(book);
      } else {
        await addBook(book);
      }
      dispatch('fetchBooks');
    },
    async deleteBook({ dispatch }, id) {
      await deleteBook(id);
      dispatch('fetchBooks');
    },
    setCurrentBook({ commit }, book) {
      commit('SET_CURRENT_BOOK', book);
    },
    resetCurrentBook({ commit }) {
      commit('RESET_CURRENT_BOOK');
    }
  },
  getters: {
    books: (state) => state.books,
    currentBook: (state) => state.currentBook,
    isEditing: (state) => state.isEditing
  }
});
