<template>
    <div>
      <h2 data-cy="content-title" id="content-title">Available Books</h2>

      <ul v-if="books.length" data-cy="book-content" id="main-content">
        <li v-for="book in books" :key="book._id" class="list-item">
          <img :src="book.image" alt="img"></img>
          <div class="text-div">
            <p><b>Title:</b> <span class="p-title">{{ book.title }}</span></p>
            <p><b>Author:</b> <span class="p-author">{{ book.author }}</span></p>
            <p><b>Price:</b> $<span class="p-price">{{ book.price }}</span></p>
          </div>
          <div class='button-space'>
            <button class="edit-btn" @click="$emit('edit', book)">Edit</button>
            <button class="delete-btn" @click="$emit('delete', book._id)">Delete</button>
          </div>
        </li>
      </ul>

      <p v-else data-cy="no-books" id="no-books">No books available</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      books: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  
<style scoped>
#content-title {
  text-align: center;
}
#main-content {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#no-books {
  text-align: center;
}
.list-item {
  width: 60%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border: 1px solid white;
  border-radius: 5px;
  padding: 10px 0;
  margin-bottom: 25px;
}

.text-div {
  width: 400px;
  height: auto;
  text-align: left;
}

.button-space {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.edit-btn {
  margin: 5px 0;
  width: 100px;
  height: 35%;
  font-weight: bold;
  border: 1px solid rgb(8, 8, 80);
  border-radius: 3px;
  background-color: blue;
  color: white;
}
.edit-btn:hover {
  cursor: pointer;
  background-color: rgb(2, 2, 44);;
}

.delete-btn {
  width: 100px;
  height: 35%;
  font-weight: bold;
  border: 1px solid rgb(61, 3, 3);
  background-color: red;
  border-radius: 3px;
  color: white;
}
.delete-btn:hover {
  cursor: pointer;
  background-color: rgb(92, 3, 3);
}
</style>
  