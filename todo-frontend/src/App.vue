<template>
  <div class="container py-4">
    <h1 class="mb-4">Todo List</h1>
    
    <form @submit.prevent="addTodo" class="mb-4">
      <div class="input-group">
        <input
          v-model="newTodo"
          type="text"
          class="form-control"
          placeholder="Add a new todo"
          required
        />
        <button type="submit" class="btn btn-primary">Add</button>
      </div>
    </form>

    <ul class="list-group">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="toggleTodo(todo.id, !todo.completed)"
            class="me-2"
          />
          <span :class="{ 'text-decoration-line-through': todo.completed }">
            {{ todo.title }}
          </span>
        </div>
        <button @click="deleteTodo(todo.id)" class="btn btn-danger btn-sm">
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useTodoStore } from './stores/todo';

export default defineComponent({
  name: 'App',
  setup() {
    const todoStore = useTodoStore();
    return { todoStore };
  },
  data() {
    return {
      newTodo: '',
    };
  },
  computed: {
    todos() {
      return this.todoStore.todos;
    },
  },
  methods: {
    async addTodo() {
      if (this.newTodo.trim()) {
        await this.todoStore.addTodo(this.newTodo);
        this.newTodo = '';
      }
    },
    async toggleTodo(id: number, completed: boolean) {
      await this.todoStore.toggleTodo(id, completed);
    },
    async deleteTodo(id: number) {
      await this.todoStore.deleteTodo(id);
    },
  },
  async created() {
    await this.todoStore.fetchTodos();
  },
});
</script>

<style>
.container {
  max-width: 600px;
}
</style>