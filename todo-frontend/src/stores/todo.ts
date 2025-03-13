import { defineStore } from 'pinia';
import axios from 'axios';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [] as Todo[],
  }),
  actions: {
    async fetchTodos() {
      const response = await axios.get('http://localhost:3000/todos');
      this.todos = response.data;
    },
    async addTodo(title: string) {
      const response = await axios.post('http://localhost:3000/todos', { title });
      this.todos.unshift(response.data);
    },
    async toggleTodo(id: number, completed: boolean) {
      const response = await axios.put(`http://localhost:3000/todos/${id}`, { completed });
      const index = this.todos.findIndex(todo => todo.id === id);
      this.todos[index] = response.data;
    },
    async deleteTodo(id: number) {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
  },
});