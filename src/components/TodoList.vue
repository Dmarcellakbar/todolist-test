<template>
  <div class="todo-list">
    <h1>To-Do List Dicky Marcellino</h1>
    <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Add new task" />
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <span>{{ todo.title }}</span>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newTodo: '',
      todos: [],
      apiUrl: process.env.VUE_APP_API_URL,
    };
  },
  methods: {
    async fetchTodos() {

      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/todos`);
        this.todos = response.data;
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    async addTodo() {
      if (this.newTodo.trim() === '') return;
      try {
        const response = await axios.post(`${process.env.VUE_APP_API_URL}/todos`, {
          title: this.newTodo,
        });
        this.todos.push(response.data);
        this.newTodo = '';
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    },
    async deleteTodo(id) {
      try {
        await axios.delete(`${process.env.VUE_APP_API_URL}/todos/${id}`);
        this.todos = this.todos.filter((todo) => todo.id !== id);
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    },
  },
  mounted() {
    this.fetchTodos();
    console.log('Available Environment Variables:', process.env.VUE_APP_API_URL);
  },
};
</script>

<style>
.todo-list {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}
input {
  padding: 8px;
  margin-bottom: 10px;
  width: 100%;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
}
button {
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
