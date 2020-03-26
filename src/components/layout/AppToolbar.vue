<template>
  <v-app-bar app clipped-right color="blue-grey" dark>
    <v-app-bar-nav-icon @click="isDrawer()"> </v-app-bar-nav-icon>
    <v-spacer></v-spacer>
    <v-btn rounded color="grey" @click="logout()">Logout</v-btn>
  </v-app-bar>
</template>

<script>
import { bus } from "../../main";
import AuthService from "../../service/auth.service";
export default {
  name: "AppToolBar",

  data() {
    return {
      drawer: true,
      test: ""
    };
  },
  methods: {
    isDrawer() {
      this.drawer = !this.drawer;
      bus.$emit("drawer", this.drawer);
    },
    logout() {
      this.isLogin = false;
      AuthService.logout();
    }
  }
};
</script>

<style scoped></style>
