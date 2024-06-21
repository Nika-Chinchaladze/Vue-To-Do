<template>
  <div>
    <h1 data-cy="main-title" id="app-title">Basic CRUD App With Vue Js</h1>
    <form data-cy="form" id="form-element" @submit.prevent="handleSubmit">
      <input v-model="bookCopy.title" placeholder="Title" data-cy="title-input" required />
      <input v-model="bookCopy.author" placeholder="Author" data-cy="author-input" required />
      <input v-model="bookCopy.image" placeholder="Image link" data-cy="image-input" required />
      <input v-model.number="bookCopy.price" type="number" placeholder="Price" data-cy="price-input" required />
      <div id="form-btn-div">
        <button id="add-update-btn" type="submit" data-cy="submit-btn">{{ isEditing ? 'Update' : 'Add' }}</button>
        <button id="cancel-btn" type="button" @click="resetForm">Cancel</button>
      </div>
    </form>
    <hr>
  </div>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
      default: () => ({ title: '', author: '', image: '', price: null })
    },
    isEditing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bookCopy: { ...this.book }
    };
  },
  watch: {
    book(newBook) {
      this.bookCopy = { ...newBook };
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.bookCopy);
      this.resetForm();
    },
    resetForm() {
      this.bookCopy = { title: '', author: '', image: '', price: null };
      this.$emit('reset');
    }
  }
};
</script>

<style scoped>
#app-title, #content-title {
  text-align: center;
}
#form-element {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#form-element input {
  width: 50%;
  box-sizing: border-box;
  padding: 5px 10px;
  margin: 5px 0;
}

#form-btn-div {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 20px;
}

#add-update-btn, #cancel-btn {
  width: 250px;
  padding: 5px 0;
  font-weight: bold;
  margin: 0 5px;
}

#add-update-btn:hover {
  cursor: pointer;
  background-color: green;
  color: white;
}
#cancel-btn:hover {
  cursor: pointer;
  background-color: rgb(177, 117, 5);
  color: white;
}

</style>
