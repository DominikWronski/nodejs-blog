const Post = require('../models/Post');
const Comment = require('../models/Comment');
const jwt = require('jsonwebtoken');

module.exports = {
    // @desc Get all posts
    // @route GET /api/v1/posts/
    // @access Public
    async getPosts (req, res) {
        try {
            const posts = await Post.findAll();
            if(posts) {
                res.status(200).send(posts);
            } else {
                res.status(404).send('There are no posts')
            }
        } catch (err) {
            console.log(err);
            res.status(500).send('Something went wrong.')
        }
    },
    // @desc Get specific post
    // @route GET /api/v1/posts/:id
    // @access Public
    async getPost (req, res) {
        try {
            const post = await Post.findByPk(req.params.postId);
            if(!post) {
                res.status(404).send('There is no post with this id.')
            } else {
                res.status(200).send(post);
            }
        } catch (err) {
            console.log(err);
            res.status(500).send('Something went wrong.')
        }
    },
    // @desc Get user posts
    // @route GET /api/v1/posts/user/:userId
    // @access Public
    async getUserPosts (req, res) {
        try {
            const posts = await Post.findAll({
                where: {
                  author_id: req.params.userId
                }
              });
              if(posts.length > 0) {
                  res.status(200).send(posts);
              } else {
                  res.status(404).send('User hasn\'t made any posts.')
              }
        } catch (err) {
            console.log(err);
            res.status(500).send('Something went wrong.')
        }
    },
    // @desc Add post
    // @route POST /api/v1/posts/
    // @access Authorized, only admin
    async addPost (req, res) {
        try {
            const tokenJWT = (req.headers.authorization).replace('Bearer ', '');
            const decodedJWT = jwt.verify(tokenJWT, process.env.TOKEN_SECRET)

            if(decodedJWT.isAdmin == true) {
                if(req.body.title == '' || req.body.body == '') {
                    res.status(204).send('Title or body is empty.');
                } else {
                    const post = await Post.create({
                        title: req.body.title,
                        body: req.body.body,
                        author_id: decodedJWT.id,
                        author_name: decodedJWT.username
                    })
                    res.status(201).send(post) //Send only title,body,author id and name instead of whole post object?
                }
            } else {
                res.status(401).send('You are not authorized to this.');
            }
        } catch (err) {
            console.log(err);
            res.status(500).send('Something has gone wrong, unknown error.')
        }
    },
    // @desc Delete specific post
    // @route DELETE /api/v1/posts/:id
    // @access Private (only admin)
    async deletePost (req, res) {
        try {
            const post = await Post.findByPk(req.params.postId);

            if(post) {
                const tokenJWT = (req.headers.authorization).replace('Bearer ', '');
                const decodedJWT = jwt.verify(tokenJWT, process.env.TOKEN_SECRET)

                if(decodedJWT.isAdmin == true) {
                    const postComments = await Comment.findAll({
                        where: {
                          post_id: req.params.postId
                        }
                    });

                    if(postComments) {
                        await Comment.destroy({
                            where: {post_id: req.params.postId},
                        })
                        await post.destroy();
                        res.status(200).send('Post with comments has been deleted.')
                    } else {
                        await post.destroy();
                        res.status(200).send('Post has been deleted.')
                    }
                } else {
                    res.status(401).send('You are not authorized to this.');
                }
            } else {
                res.status(404).send('There is no post with this id.')
            }
        } catch (err) {
            console.log(err);
            res.status(500).send('Something went wrong.')
        }
    },
    // @desc Edit specific post
    // @route Edit /api/v1/posts/:id
    // @access Authorized
    async editPost(req, res) {
        try {
            const post = await Post.findByPk(req.params.postId)
            
            if(post) {
                const tokenJWT = (req.headers.authorization).replace('Bearer ', '');
                const decodedJWT = jwt.verify(tokenJWT, process.env.TOKEN_SECRET)

                if(decodedJWT.isAdmin == true) {
                    if(req.body.title == '' || req.body.body == '') {
                        res.status(204).send('Title or body is empty.');
                    } else {
                        await post.update(
                            {body: req.body.body,
                            title: req.body.title},
                            {where: {id: req.params.postId}}
                        )
                        res.status(200).send('Post successfully edited.')
                    }
                } else {
                    res.status(401).send('You are not authorized to this.');
                }
            } else {
                res.status(404).send('There is no post with this id.')
            }
        } catch (err) {
            console.log(err);
            res.status(500).send('Something went wrong.')
        }
    },
    // @desc Get specific post comments
    // @route GET /api/v1/posts/comments/:id
    // @access Public
    async getPostComments (req, res) {
        try {
            const postComments = await Comment.findAll({
                where: {
                  post_id: req.params.postId
                }
              });
              
            if(!postComments) {
                res.status(404).send('Post doesn\'t exist or there are no comments.')
            } else {
                res.status(200).send(postComments);
            }
        } catch (err) {
            console.log(err);
            res.status(500).send('Something went wrong.')
        }
    },
    // @desc Add comment to post
    // @route POST /api/v1/posts/comments/:postId
    // @access Public
    async addPostComment (req, res) {
        try {
            const tokenJWT = (req.headers.authorization).replace('Bearer ', '');
            const decodedJWT = jwt.verify(tokenJWT, process.env.TOKEN_SECRET)

            if(req.body.body == '') {
                res.status(204).send('Comment content is empty.');
            } else {
                const comment = await Comment.create({
                    body: req.body.body,
                    author_id: decodedJWT.id,
                    author_name: decodedJWT.username,
                    post_id: req.params.postId
                })
                res.send(comment)
            }
        } catch (err) {
            console.log(err);
            res.status(500).send('Something went wrong.')
        }
    },
    // @desc Delete specific comment from post
    // @route DELETE /api/v1/posts/comments/:commentId
    // @access Private
    async deletePostComment (req, res) {
        try {
            const comment = await Comment.findByPk(req.params.commentId)

            if(comment) {
                const tokenJWT = (req.headers.authorization).replace('Bearer ', '');
                const decodedJWT = jwt.verify(tokenJWT, process.env.TOKEN_SECRET)
                if(decodedJWT.isAdmin == true || decodedJWT.id == comment.author_id) {
                    await comment.destroy();
                    res.status(200).send('Comment has been deleted.');
                } else {
                    res.status(401).send('You are not authorized to this.');
                }
            } else {
                res.status(404).send('There is no comment with this id.')
            }
        } catch (err) {
            console.log(err);
            res.send('Something went wrong.')
        }
    },
    // @desc Edit specific comment from post
    // @route PUT /api/v1/posts/comments/:commentId
    // @access Private
    async editPostComment (req, res) {
        try {
            const comment = await Comment.findByPk(req.params.commentId)
            if(comment) {
                const tokenJWT = (req.headers.authorization).replace('Bearer ', '');
                const decodedJWT = jwt.verify(tokenJWT, process.env.TOKEN_SECRET)
                if(decodedJWT.isAdmin == true || decodedJWT.id == comment.author_id) {
                    if(req.body.comment == '') {
                        res.status(204).send('Comment content is empty.');
                    } else {
                        await comment.update(
                            {body: req.body.comment},
                            {where: {id: req.params.postId}}
                        )
                        res.status(200).send('Comment successfully edited.')
                    }
                } else {
                    res.status(401).send('You are not authorized to this.');
                }
            } else {
                res.status(404).send('There is no comment with this id.')
            }
        } catch (err) {
            console.log(err);
            res.send('Something went wrong.')
        }
    },
}