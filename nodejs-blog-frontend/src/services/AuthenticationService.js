import Api from '@/services/Api'

export default {
    register (credentials) {
        return Api().post('/api/v1/users/register', credentials)
    },
    login (credentials) {
        return Api().post('/api/v1/users/login', credentials)
    },
    getUser (id) {
        return Api().get('/api/v1/users/user/' + id)
    },
    changeEmail (credentials) {
        return Api().put('/api/v1/users/changeEmail', credentials)
    },
    changePassword (credentials) {
        return Api().put('/api/v1/users/changePassword', credentials)
    }
}