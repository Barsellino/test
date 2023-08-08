import Vue from 'vue';
import Vuex from 'vuex';
// modules
import users from '@/store/modules/users';
import todo from '@/store/modules/todo';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    todo
  }
});
