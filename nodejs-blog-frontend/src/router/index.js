import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AddPost from '../views/AddPost.vue'
import Profile from '../views/Profile.vue'
import Post from '../views/Post.vue'
import EditPost from '../views/EditPost.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/addpost',
    name: 'AddPost',
    component: AddPost
  },
  {
    path: '/profile/:userId',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/post/:postId',
    name: 'Post',
    component: Post
  },
  {
    path: '/editpost/:postId',
    name: 'EditPost',
    component: EditPost
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
