import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

const routes = [
  {path: '/', component: () => import('@/views/Home.vue')},
  {path: '/todos', component: () => import('@/views/Todos.vue')},
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router