<template>
  <v-container v-if="this.posts"> 

    <v-card
      elevation="2"
      class="mx-auto my-12"
      max-width="1300"
      v-for="post in posts.slice().reverse()" :key="post.id"
    >

    <v-card-title>
        <router-link
            :to="{
            name: 'Post',
            params: {postId: post.id}
            }">

            {{post.title}}
        </router-link>
    </v-card-title>

      <v-card-subtitle>
        <router-link
            :to="{
            name: 'Profile',
            params: {userId: post.author_id}
        }">

            {{post.author_name}}
        </router-link>
      </v-card-subtitle>



    <v-card-text>{{post.body}}</v-card-text>

    <v-card-actions v-if="$store.state.isUserLoggedIn && $store.state.user.isAdmin == true">
        <router-link
            :to="{
            name: 'EditPost',
            params: {postId: post.id}
        }">
      <v-btn
        color="primary"
        text
      >
        Edit
      </v-btn>
        </router-link>

      <v-btn
        color="primary"
        text
        @click="deletePost(post.id)"
      >
        Delete
      </v-btn>
    </v-card-actions>
    </v-card>
  </v-container>

</template>

<script>
import PostsService from '@/services/PostsService'

  export default {
    name: 'Posts',

      props: ['paramUserId', 'paramPostId'],

      data: () => ({
        posts: [],
        user: JSON.parse(localStorage.getItem('vuex')).token,
      }),

    methods: {
      async loadPosts () {
        try {

          if(this.paramUserId) {
              // let response = (await PostsService.loadUserPosts(this.paramUserId)).data;
              // (this.posts).push(response); 
              this.posts = (await PostsService.loadUserPosts(this.paramUserId)).data
          } else {
            if(this.paramPostId) {
              let response = (await PostsService.loadPost(this.paramPostId)).data;
              (this.posts).push(response); 
              // this.posts = (await PostsService.loadPost(this.paramPostId)).data
            } else {
              this.posts = (await PostsService.loadPosts()).data
            }
          }
        } catch (error) {
          this.errors.push(error.response.data)
        }
      },
      async deletePost (id) {
        try {
          await PostsService.deletePost(id, {
            user: this.user,
          })

          // const response = await PostsService.deletePost(id, {
          //     user: this.user
          // })
          this.loadPosts();
          
        } catch (error) {
          this.errors.push(error.response.data)
        }
      },
    },

          mounted () {
            this.loadPosts()
            },
  
  }
</script>
