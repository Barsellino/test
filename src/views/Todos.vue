<template>
    <div class="todos">
        <div class="container">
            <div class="todos__header">
                <user-info/>
            </div>
            <div class="todos__list">
                <todo-list/>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: 'TodosPage',
  components: {
    TodoList: () => import('@/components/views/todos/TodoList/index.vue'),
    UserInfo: () => import('@/components/views/todos/UserInfo.vue'),
  },
	methods: {
    ...mapActions(['fetchUsers'])
	},
  mounted() {
    this.fetchUsers()
  }
}
</script>

<style scoped>
.todos {
    min-height: 100vh;
    background: #545454;
    color: #FFF;
    font-family: Roboto, sans-serif;
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 21px; /* 123.529% */
    letter-spacing: -0.425px;
}
</style>