<template>
<!-- <v-container fluid?></v-container> -->
  <div class="login">
    <v-flex xs6 offset-xs3 test>
      <v-card>
        <v-col>
            <v-card-title>Register</v-card-title>

            <v-text-field
              v-model="username"
              label="Username"
              type="username"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              label="E-mail"
              type="email"
              required
            ></v-text-field>

            <v-text-field
              label="Password"
              type="password"
              v-model="password"
              required

            ></v-text-field>

            <p v-if="errors.length">
                <v-alert dense type="error" v-for="error in errors" :key="error">{{error}}</v-alert>
            </p>

            <p>By cliking register button and creating an account, you agree to the Terms of Service.</p>
            <v-btn
              dark
              class="primary"
              @click="register">
              Register
            </v-btn>
        </v-col>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
  data () {
    return {
      username: '',
      email: '',
      password: '',
      errors: []
    }
  },
  methods: {
    async register () {
      try {
        this.errors = [];
        if(this.email == "" && this.password == "") {
          this.errors.push("Email and password required.")
        } else if(this.email == "") {
            this.errors.push('Email required.');
        } else if(this.password == "") {
            this.errors.push('Password required.');
        } else {
            // eslint-disable-next-line no-unused-vars
            const response = await AuthenticationService.register({
              username: this.username,
              email: this.email,
              password: this.password
            })
            this.$router.push('/login')
            // notifaction about created acc (account created, now you can log in)
        }
      } catch (error) {
        this.errors.push(error.response.data)
      }
    }
  },

}
</script>

<style scoped>
.test {
      padding-top: 35px;
}
</style>
