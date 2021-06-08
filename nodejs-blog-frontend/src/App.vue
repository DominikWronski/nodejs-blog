<template>
  <v-app>
    <Header />

    <v-main>
        <!-- <router-view></router-view> -->
        <router-view :key="$route.path"></router-view>
    </v-main>
  </v-app>
</template>

<script>
// import Posts from './components/Posts';
import Header from './components/Header';

export default {
  name: 'App',

  components: {
    // Posts,
    Header
  },

  data: () => ({
    //
  }),
};
</script>

<style>
.topPadding {
      padding-top: 35px;
}

a { text-decoration: none; }
</style>