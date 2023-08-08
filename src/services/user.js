import api from '@/services/api';

const getUsers = () => {
  return api.get('/users')
}

export default {
  getUsers
}