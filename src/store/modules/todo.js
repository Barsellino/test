import userApi from '@/services/todo';

export default {
  state: {
    todos: []
  },
  mutations: {
    SET_TODOS(state, todos) {
      state.todos = todos
    },
    SET_NEW_TODO(state, todo) {
      state.todos.push(todo)
    }
  },
  actions: {
    async fetchTodos({commit}, filters) {
      const params = {
        ...filters,
        title: null,
        favorites: null
      }
      try {
        const response = await userApi.fetchTodos({params});
        let todo = response.data;

        if (filters.title) {
          todo = todo.filter(todo => todo.title.includes(filters.title));
        }
        if (filters.favorites) {
          const allFavorites = JSON.parse(localStorage.getItem('favorites'))
          todo = todo.filter(obj => allFavorites.includes(obj.id));
        }

        commit('SET_TODOS', todo);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    async createTodo({commit}, todo) {
      const response = await userApi.createTodo(todo);
      let newTodo = response.data;
      commit('SET_NEW_TODO', newTodo)
    }
  },
  getters: {
    getTodos: state => state.todos
  },
}