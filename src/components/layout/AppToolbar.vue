<template>
  <v-app-bar app clipped-right color="blue-grey" dark>
    <div class="">
      <v-app-bar-nav-icon @click="isDrawer()"> </v-app-bar-nav-icon>
    </div>
  </v-app-bar>
</template>

<script>
import { bus } from "../../main";
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
    }
  }
};
</script>

<style scoped></style>
