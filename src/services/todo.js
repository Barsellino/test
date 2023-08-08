import api from '@/services/api';

const fetchTodos = (params) => {
  return api.get('/todos', params)
}

const createTodo = (data) => {
  return api.post('/todos', data)
}

export default {
  fetchTodos,
  createTodo
}