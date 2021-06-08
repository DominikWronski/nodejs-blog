import Api from '@/services/Api'

export default {
    loadComments (postId) {
        return Api().get('/api/v1/posts/comments/' + postId)
    },
    addComment (id, credentials) {
        return Api().post('/api/v1/posts/comments/' + id, credentials)
    },
    deleteComment (id, credentials) {
        return Api().delete('/api/v1/posts/comments/' + id, { data: credentials})
    },
    editComment (id, credentials) {
        return Api().put('/api/v1/posts/comments/' + id, credentials);
    }
}