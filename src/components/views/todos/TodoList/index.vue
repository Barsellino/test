<template>
    <div>
        <h3> Todos </h3>
        <div class="todo__filter">
            <div class="todo__filter-item">
								<span class="todo__filter-title">
										status:
								</span>
                <c-selector
                        :options="optionSelected"
                        @selected="statusSelected"
                />
            </div>
            <div class="todo__filter-item">
                <span class="todo__filter-title">userId:</span>
                <c-selector
                        :options="optionUserIds"
                        @selected="userIdSelected"

                />
            </div>
            <div class="todo__filter-item todo__filter--input">
                <span class="todo__filter-title">search:</span>
                <c-input v-model="filters.title"/>
            </div>
            <div class="todo__filter-item">
                <c-button title="Add todo" @click="openDialog"/>
            </div>
        </div>
        <div class="table-container">
            <table class="custom-table">
                <thead>
                <tr>
                    <th class="column-header">userId</th>
                    <th class="column-header">title</th>
                    <th class="column-header">status</th>
                    <th class="column-header">favorites</th>
                </tr>
                </thead>
                <tbody>
                <todo-item v-for="(item, index) in todos" :key="index" :item="item"/>
                </tbody>
            </table>
        </div>
        <c-dialog :is-open="isOpenDialog" @submit="addTodo" @close="closeDialog">
            <div class="dialog-input">
                <span class="todo__dialog-title"> userId: </span>
                <c-input v-model.number="todo.userId"/>
            </div>
            <div class="dialog-input">
                <span class="todo__dialog-title"> Title </span>
                <c-input v-model="todo.title"/>
            </div>
        </c-dialog>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: 'TodoList',
  components: {
    CDialog: () => import('@/components/dialogs/c-Dialog.vue'),
    CButton: () => import('@/components/ui/c-Button.vue'),
    CInput: () => import('@/components/ui/c-Input.vue'),
    CSelector: () => import('@/components/ui/c-Selector.vue'),
    TodoItem: () => import('@/components/views/todos/TodoList/TodoItem.vue')
  },
  data() {
    return {
      filters: {
        userId: null,
        completed: null,
        title: null,
        favorites: null
      },
      todo: {
        userId: null,
        title: null,
        completed: false
      },
      optionSelected: [
        {name: 'All', value: null},
        {name: 'Completed', value: true},
        {name: 'Uncompleted', value: false},
        {name: 'Favorites', value: 'favorites'}
      ],
      isOpenDialog: false
    }
  },
  computed: {
    ...mapGetters({
      todos: 'getTodos',
      optionUserIds: 'getUsersIdsOption'
    })
  },
  methods: {
    ...mapActions(['fetchTodos', 'createTodo']),
    userIdSelected(userId) {
      this.filters.userId = userId.value
    },
    statusSelected(status) {
      if (status.value === 'favorites') {
        this.filters.completed = null
        this.filters.favorites = true
      } else {
        this.filters.favorites = null
        this.filters.completed = status.value
      }
    },
    openDialog() {
      this.isOpenDialog = true
    },
    closeDialog() {
      this.isOpenDialog = false
      this.todo.userId = null
      this.todo.title = null
    },
    async addTodo() {
      try {
        await this.createTodo(this.todo)
        this.$toast.success('Success')
        this.closeDialog()
        this.todo.userId = null;
        this.todo.title = null;
      } catch (e) {
        this.$toast.error(e.message)
      }
    }
  },
  watch: {
    filters: {
      handler() {
        this.fetchTodos(this.filters)
      },
      deep: true
    }
  },
  mounted() {
    this.fetchTodos(this.filters)
  }
}
</script>

<style scoped>
.todo__filter {
    display: flex;
    margin-bottom: 50px;
    width: 100%;
    justify-content: space-between;
    @media (max-width: 991px) {
        flex-direction: column;
        font-size: 13px;
    }
}

.todo__filter-title {
    margin: 0 15px 0 0;
}

.todo__dialog-title {
    margin: 0 10px 0 0;
    color: #0e0c0c;
}

.todo__filter--input {
    display: flex;
    align-items: center;
}

.todo__filter-item {
    margin: 10px;
}

.table-container {
    max-width: 100%;
    overflow-x: auto;
}

.custom-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ccc;
    @media (max-width: 991px) {
        font-size: 13px;
    }
}

.column-header {
    color: #545454;
    padding: 8px;
    border: 1px solid #ccc;
    text-align: left;
}

.column-header {
    background-color: #f0f0f0;
    font-weight: bold;
}

.dialog-input {
    margin-bottom: 10px;
}
</style>