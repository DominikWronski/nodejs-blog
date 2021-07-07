import Api from '@/services/Api'

export default {
    loadComments (postId) {
        return Api().get('/api/v1/posts/comments/' + postId)
    },
    addComment (id, credentials) {
        return Api().post('/api/v1/posts/comments/' + id, credentials)
    },
    deleteComment (id) {
        return Api().delete('/api/v1/posts/comments/' + id)
    },
    editComment (id, credentials) {
        return Api().put('/api/v1/posts/comments/' + id, credentials);
    }
}