<template>
  <div class="login">
    <v-flex xs6 offset-xs3 test>
            <posts :paramPostId="this.$route.params.postId"></posts>
            <comments :paramPostId="this.$route.params.postId"></comments>
    </v-flex>
  </div>
</template>

<script>
import Posts from '@/components/Posts.vue'
import Comments from '@/components/Comments.vue'

export default {
    name: 'Post',
    components: {
      Posts,
      Comments
    },
}
</script>

<style>

</style>