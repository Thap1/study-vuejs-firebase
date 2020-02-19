<template>
  <v-navigation-drawer v-model="drawer" app>
    <p>Menu</p>
  </v-navigation-drawer>
</template>

<script>
import { bus } from "../../main";

export default {
  name: "AppDrawer",
  created() {
    bus.$on("drawer", value => {
      this.drawer = value;
    });
  },
  data() {
    return {
      drawer: true
    };
  }
};
</script>

<style scoped></style>
