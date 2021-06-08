<template>
  <div class="profile" v-if="this.user">
    <v-flex xs6 offset-xs3 test>
      <v-card>
        <v-col>
            <v-card-title>{{this.user.username}}</v-card-title>
            <v-card-subtitle>{{this.user.email}}</v-card-subtitle>
            <v-card-actions v-if="$store.state.isUserLoggedIn && (this.userVisiting.user.id == this.$route.params.userId)">
              
                <v-text-field
                  v-model="email"
                  label="E-mail"
                  type="email"
                  required
                ></v-text-field>
                <v-btn color="primary" text @click="changeEmail" >Change email</v-btn>
                
                <v-text-field
                  label="Password"
                  type="password"
                  v-model="password"
                  required
                ></v-text-field>
                <v-btn color="primary" text @click="changePassword">Change password</v-btn>
            </v-card-actions>

          <p v-if="errors.length">

              <v-alert dense type="error" v-for="error in errors" :key="error">{{error}}</v-alert>
            
          </p>
        </v-col>
      </v-card>
            <posts :paramUserId="this.user.id"></posts>
    </v-flex>
  </div>
</template>

<script>
import Posts from '@/components/Posts.vue'
import AuthenticationService from '@/services/AuthenticationService'

export default {
    name: 'Profile',
    components: {
      Posts
    },
    data () {
        return {
        user: null,
        userVisiting: null,
        errors: [],
        email: null,
        password: null
        }
    },
    methods: {
      async loadUser(userId) {
        try {
            this.user = (await AuthenticationService.getUser(userId)).data
            this.userVisiting = JSON.parse(localStorage.getItem('vuex'))
            // this.userVisiting = $store.state.user
          } catch (error) {
            this.errors.push(error.response.data)
        }
      },
      async changeEmail() {
        try {
            this.errors = [];
            if(this.email == "") {
              this.errors.push('Email can\'t be same as old email.');
            } else {
                try {
                      // eslint-disable-next-line no-unused-vars
                      const response = await AuthenticationService.changeEmail({
                        email: this.email,
                        user: this.userVisiting.token
                      })
                      this.$router.push('/profile/' + this.$route.params.userId)
                } catch (error) {
                    this.errors.push(error.response.data)
                }
            }
        } catch (error) {
          this.errors.push(error.response.data)
        }
      },
      async changePassword() {
        try {
            this.errors = [];
            if(this.password == "") {
              this.errors.push('Password cant be same as old password.');
            } else {
                try {
                      const response = await AuthenticationService.changePassword({
                        password: this.password,
                        user: this.userVisiting.token
                      })
                      this.$router.push('/profile/' + this.$route.params.userId)
                      console.log(response);
                } catch (err) {
                      console.log(err)
                      this.errors.push(err)
                }
            }
        } catch (error) {
          this.errors.push(error.response.data)
        }
      },
    },
    created: function () {
        this.loadUser(this.$route.params.userId)
    },
}
</script>

<style scoped>
.test {
      padding-top: 35px;
}

</style>
