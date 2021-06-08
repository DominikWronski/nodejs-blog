<template>
    <v-app-bar
      app
      color="primary"
      dark
    >

        <router-link 
        class="home"
        tag="span"
        :to="{
          name: 'Home'
        }">
      <div class="d-flex align-center header">
        <h2>NODE</h2>
        <h2><b><i>BLOG</i></b></h2>
      </div>
      </router-link>

        <router-link v-if="$store.state.isUserLoggedIn"
            :to="{
            name: 'Home'
            }">
            <v-btn text>
                <span class="mr-2">POSTS</span>
                <v-icon>mdi-post</v-icon>
            </v-btn>
        </router-link>

        <router-link v-if="$store.state.isUserLoggedIn && $store.state.user.isAdmin == true"
            :to="{
            name: 'AddPost'
            }">
            <v-btn text>
                <span class="mr-2">ADD POST</span>
                <v-icon>mdi-pen</v-icon>
            </v-btn>
        </router-link>

        <router-link v-if="$store.state.isUserLoggedIn"
            :to="{
            name: 'Profile',
            params: {userId: $store.state.user.id}
            }">
            <v-btn text>
                <span class="mr-2">PROFILE</span>
                <v-icon>mdi-account</v-icon>
            </v-btn>
        </router-link>

      <v-spacer></v-spacer>

        <router-link v-if="!$store.state.isUserLoggedIn"
            :to="{
            name: 'Login'
            }">
            <v-btn text>
                <span class="mr-2">Login</span>
                <v-icon>mdi-account-arrow-right</v-icon>
            </v-btn>
        </router-link>

        <router-link v-if="!$store.state.isUserLoggedIn"
            :to="{
            name: 'Register'
            }">
            <v-btn text>
                <span class="mr-2">Register</span>
                <v-icon>mdi-account-plus</v-icon>
            </v-btn>
        </router-link>
        
        <v-btn text v-if="$store.state.isUserLoggedIn"
          @click="logout"
        >
          <span class="mr-2">Logout</span>
          <v-icon>mdi-account-arrow-left</v-icon>
        </v-btn>

    </v-app-bar>
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push('/')
      // this.$router.push({
      //   name: 'HelloWorld'
      // })
    }
  }
}
</script>


<style scoped>
.header {
  cursor: pointer;
}

</style>