import Api from '@/services/Api'

export default {
    loadPosts () {
        return Api().get('/api/v1/posts/')
    },
    loadPost (postId) {
        return Api().get('/api/v1/posts/' + postId)
    },
    addPost (credentials) {
        return Api().post('/api/v1/posts/', credentials)
    },
    deletePost (id, credentials) {
        return Api().delete('/api/v1/posts/' + id, { data: credentials})
    },
    loadUserPosts (userId) {
        return Api().get('/api/v1/posts/user/' + userId)
    },
    editPost (id, credentials) {
        return Api().put('/api/v1/posts/' + id, credentials)
    },
}