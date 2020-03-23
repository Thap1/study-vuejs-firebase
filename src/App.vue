<template>
  <v-app style="background: #e9ebee">
    <router-view></router-view>
  </v-app>
</template>

<script>
import AuthService from "./service/auth.service";
export default {
  name: "App",
  data: () => ({
    //
  }),
  created() {
    this.getUid();
  },
  methods: {
    getUid() {
      if (AuthService.isCheckLogin()) {
        this.$store.dispatch("setUid", AuthService.getUid());
      }
    }
  }
};
</script>
<style>


</style>
