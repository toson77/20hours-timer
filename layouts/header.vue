<template>
  <v-app-bar
    elevation="0"
    height="50px"
  >
    <v-spacer />
    <v-toolbar-title class="text-h6 white--text">
      {{ appName }}
    </v-toolbar-title>
    <v-spacer />

    <v-btn
      height="30px"
      width="70px"
      color="rgba(255, 255, 255, 0.1)"
      @click="logout()"
      class="white--text"
    >Logout</v-btn>

    <v-spacer />
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    appName: "20時間タイマー"
  }),
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
