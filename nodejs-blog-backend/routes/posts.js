const express = require('express');
const PostController = require('../controllers/PostController');
const isAuthenticated = require('../isAuthenticated')

const router = express.Router();

// Get all posts
router.get('/',
    PostController.getPosts
);

// Get specific post
router.get('/:postId',
PostController.getPost
);

// Get all user posts
router.get('/user/:userId',
    PostController.getUserPosts
);

// Add post
router.post('/',
    isAuthenticated,
    PostController.addPost
)

// Delete post
router.delete('/:postId',
    isAuthenticated,
    PostController.deletePost
)

// Edit post
router.put('/:postId',
    isAuthenticated,
    PostController.editPost
);

// Get all comments
router.get('/comments/:postId',
    PostController.getPostComments
);

// Add comment to post
router.post('/comments/:postId',
    isAuthenticated,
    PostController.addPostComment
);

// Delete comment from post
router.delete('/comments/:commentId',
    isAuthenticated,
    PostController.deletePostComment
);

// Edit comment from post
router.put('/comments/:commentId',
    isAuthenticated,
    PostController.editPostComment
);

module.exports = router;