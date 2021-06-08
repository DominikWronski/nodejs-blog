<template>
<!-- <v-container fluid?></v-container> -->
  <div class="login">
    <v-flex xs6 offset-xs3 test>
      <v-card>
        <v-col>
            <v-card-title>Login</v-card-title>
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

            <v-checkbox
              v-model="checkbox"
              label="Remember password"
            ></v-checkbox>
            <v-btn
              dark
              class="primary"
              @click="login">
              Login
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
      email: '',
      password: '',
      errors: [],
      checkbox: false,
    }
  },
  methods: {
    async login () {
      try {
        this.errors = [];
        if(this.email == "" && this.password == "") {
          this.errors.push("Email and password required.")
        } else if(this.email == "") {
            this.errors.push('Email required.');
        } else if(this.password == "") {
            this.errors.push('Password required.');
        } else {
            const response = await AuthenticationService.login({
              email: this.email,
              password: this.password
            })
            this.$store.dispatch('setToken', response.data.token)
            this.$store.dispatch('setUser', response.data.user)
            this.$router.push('/')
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
