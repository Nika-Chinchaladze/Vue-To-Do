<template>
    <div id="app">
      <BookForm
        :book="currentBook"
        :isEditing="isEditing"
        @submit="handleSubmit"
        @reset="resetForm"
      />
      <BookList
        :books="books"
        @edit="editBook"
        @delete="deleteBook"
      />
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  import BookForm from './components/BookForm.vue';
  import BookList from './components/BookList.vue';
  
  export default {
    components: {
      BookForm,
      BookList
    },
    computed: {
      ...mapState(['books', 'currentBook', 'isEditing'])
    },
    methods: {
      ...mapActions(['fetchBooks', 'saveBook', 'deleteBook', 'setCurrentBook', 'resetCurrentBook']),
      async handleSubmit(book) {
        if (book.title) {
          await this.saveBook(book);
          this.resetCurrentBook();
        }
      },
      editBook(book) {
        this.setCurrentBook(book);
      },
      resetForm() {
        this.resetCurrentBook();
      }
    },
    created() {
      this.fetchBooks();
    }
  };
  </script>
  
<style>
body {
  background-color: rgb(49, 48, 48);
  color: white;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

img {
  width: 100px;
  height: auto;
}

p {
  margin: 0;
  padding: 0;
}

hr {
  border: 1px dashed white;
  width: 70%;
  margin-bottom: 30px;
}
</style>
  