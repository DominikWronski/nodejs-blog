<template>
<div class="addpost">
    <v-flex xs6 offset-xs3 topPadding>
      <v-card>
        <v-col>
            <v-card-title>Add post</v-card-title>

            <v-text-field
              v-model="title"
              label="Post title"
              type="text"
              required
            ></v-text-field>

            <v-text-field
              v-model="body"
              label="Post description"
              type="text"
              required
            ></v-text-field>

            <p v-if="errors.length">
                <v-alert dense type="error" v-for="error in errors" :key="error">{{error}}</v-alert>
            </p>

            <v-btn
              dark
              class="primary"
              @click="addpost">
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
  name: 'AddPost',
  data () {
    return {
      title: '',
      body: '',
      errors: []
    }
  },
  methods: {
    async addpost () {
      try {
        this.errors = [];
        if(this.title == "" && this.body == "") {
            this.errors.push('Title and post body required.');
        } else if(this.title == "") {
            this.errors.push('Title required.');
        } else if(this.body == "") {
            this.errors.push('Post body required.');
        } else {
            // eslint-disable-next-line no-unused-vars
            const response = await PostsService.addPost({
              title: this.title,
              body: this.body,
            })

            //?
            // await PostsService.addPost({
            //   title: this.title,
            //   body: this.body,
            //   user: this.user
            //   // user: JSON.parse(this.user).user.token
            // })
            this.$router.push('/')
        }
      } catch (error) {
        this.errors.push(error.response.data)
      }
    }
  },
}

</script>