<template>
<div class="editpost">
    <v-flex xs6 offset-xs3 topPadding>
      <v-card>
        <v-col>
            <v-card-title>Edit post</v-card-title>
            <v-text-field
              v-model="title"
              label="Post title"
              type="text"
              required
            ></v-text-field>
            <v-text-field
              label="Post description"
              type="text"
              v-model="body"
              required

            ></v-text-field>

            <p v-if="errors.length">
                <v-alert dense type="error" v-for="error in errors" :key="error">{{error}}</v-alert>
            </p>

            <v-btn
              dark
              class="primary"
              @click="editPost">
              Submit
            </v-btn>
        </v-col>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
// @ is an alias to /src
import PostsService from '@/services/PostsService'

export default {
  name: 'EditPost',


  data () {
    return {
      postId: null,
      title: '',
      body: '',
      errors: []
    }
  },
  methods: {
    async editPost () {
      try {
        this.errors = [];
        if(this.title == '' && this.body == '') {
            this.errors.push('Title and body required.');
        } else if(this.title == '') {
            this.errors.push('Title required.');
        } else if(this.body == '') {
            this.errors.push('Post body required.');
        } else {
              await PostsService.editPost(this.postId, {
                title: this.title,
                body: this.body,
                user: this.$store.state.token
              })
              this.$router.push('/')
        }
      } catch (error) {
        this.errors.push(error.response.data)
      }
    },
    async loadPost () {
      try {
        let response = (await PostsService.loadPost(this.$route.params.postId)).data;
        this.postId = response.id
        this.title = response.title;
        this.body = response.body
      } catch (error) {
        this.errors.push(error.response.data)
      }
    },
  },
  mounted() {
    this.loadPost()
  }
}
</script>