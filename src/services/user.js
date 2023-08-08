import api from '@/services/api';

const fetchUsers = () => {
    return api.get('/users')
}

export default fetchUsers