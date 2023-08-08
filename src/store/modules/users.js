import userApi from '@/services/user';
export default {
  state: {
    users: [],
    isAuth: false,
    user: {}
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_AUTH(state, auth) {
      state.isAuth = auth
    },
    SET_USER_INFORMATION(state, user) {
      state.user = user
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await userApi.getUsers();
        const users = response.data;
        commit('SET_USERS', users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async checkUser({ commit, state }, payload){
      const users = state.users;
      const userInfo = users.find(user => user.username === payload.username);
      if (userInfo) {
        const userPhone = userInfo.phone.split(' ')[0]
        if(userPhone === payload.phone){
          commit('SET_AUTH', true)
          commit('SET_USER_INFORMATION', userInfo)
        } else {
          commit('SET_AUTH', false)
          throw new Error('Wrong in number');
        }
      } else {
        commit('SET_AUTH', false)
        throw new Error('User not found');
      }
    }
  },
  getters: {
    getIsAuth: state => state.isAuth,
    getUserInfo: state => state.user,
    getUsersIdsOption: state => {
      const userIds = state.users.map( user => {
        return {
          name: user.id.toString(),
          value: user.id.toString(),
        }
      })
      userIds.unshift({
        name: 'All users',
        value: null
      })
      return userIds
    }
  },
}