<template>
  <v-container> 
    <h1>Comments</h1>

    <v-flex mx-auto my-12 v-if="$store.state.isUserLoggedIn">
      <v-card>
        <v-col>
            <!-- <v-card-title>Add comment</v-card-title> -->
            <v-text-field
              v-model="comment"
              label="Add a public comment..."
              type="text"
              required
            ></v-text-field>

            <p v-if="errors.length">
                <v-alert dense type="error" v-for="error in errors" :key="error">{{error}}</v-alert>
            </p>

            <v-btn
              dark
              class="primary"
              @click="addComment">
              Comment
            </v-btn>
        </v-col>
      </v-card>
    </v-flex>

    <v-card
      elevation="2"
          class="mx-auto my-12"
              max-width="1300"
              v-for="comment in comments.slice().reverse()" :key="comment.id"
    >

    <v-card-title>

        <router-link
            :to="{
            name: 'Post',
            params: {postId: comment.id}
        }">
            {{comment.title}}
        </router-link>

    </v-card-title>

      <v-card-subtitle>
        <router-link
            :to="{
            name: 'Profile',
            params: {userId: comment.author_id}
        }">
            {{comment.author_name}}
        </router-link>
      </v-card-subtitle>



    <v-card-text>{{comment.body}}</v-card-text>

    <v-card-text v-if="editingNow[comment.id]">
            <v-text-field 
              v-model="editInput"
              label="Edit comment"
              type="text"
              required
            ></v-text-field>

          <v-btn
            color="primary"
            text
            @click="editComment(comment.id)"
          >
            Submit
          </v-btn>

    </v-card-text>

    <v-card-actions v-if="($store.state.isUserLoggedIn && $store.state.user.isAdmin == true) || ($store.state.isUserLoggedIn && $store.state.user.id == comment.author_id)">
      <v-btn
        color="primary"
        text
        @click="showEditComment(comment.id)"
      >
        Edit
      </v-btn>

      <v-btn
        color="primary"
        text
        @click="deleteComment(comment.id)"
      >
        Delete
      </v-btn>
    </v-card-actions>

    </v-card>
  </v-container>
</template>

<script>
import CommentsService from '@/services/CommentsService'

  export default {
    name: 'Comments',

      props: ['paramPostId'],

      data: () => ({
        comments: [],
        comment: '',
        errors: [],
        editingNow: [],
        editInput: '',
      }),

    methods: {
      async loadComments () {
        try {
          this.comments = (await CommentsService.loadComments(this.paramPostId)).data
        } catch (error) {
          this.errors.push(error.response.data)
        }
      },

    async addComment () {
      try {
        this.errors = [];
        if(this.comment == "") {
            this.errors.push('You can\'t send blank comment!');
        } else {
          if(this.comment.length < 3) {
            this.errors.push('Your comment is too short!');
          } else {
              await CommentsService.addComment(this.paramPostId, {
                body: this.comment,
              })
              location.reload();
          }
        }
      } catch (error) {
        this.errors.push(error.response.data)
      }
    },

      async deleteComment (id) {
        try {
          await CommentsService.deleteComment(id)
          this.loadComments();
          
        } catch (error) {
          this.errors.push(error.response.data)
        }
      },
      async showEditComment (id) {
        if(this.editingNow[id] == true) {
          this.editingNow[id] = false;
        } else {
          this.editingNow[id] = true;
        }
        this.loadComments()
      },
      async editComment (id) {
        try {
          await CommentsService.editComment(id, {
              user: this.user,
              comment: this.editInput
          })
          this.editingNow[id] = false;
          this.loadComments();
          
        } catch (error) {
          this.errors.push(error.response.data)
        }
      }
    },
    mounted () {
      this.loadComments()
    },
  }
</script>

<style scoped>
h1 {
  text-align: center;
  font-weight: 200;
}
</style>