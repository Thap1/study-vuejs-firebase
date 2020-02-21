<template>
  <div>
    <v-container>
      <AppToolbarHome></AppToolbarHome>
    </v-container>
    <v-container>
      <AppContentHome></AppContentHome>
    </v-container>
    <v-container>
      <AppFooterHome></AppFooterHome>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import Constant from "../../util/constant";
import AppToolbarHome from "../layout/AppToolbarHome";
import AppFooterHome from "../layout/AppFooterHome";
import AppContentHome from "../layout/AppContentHome";

export default {
  name: "Home",
  components: { AppContentHome, AppFooterHome, AppToolbarHome },
  data() {
    return {
      data: []
    };
  },
  created() {
    console.log(firebase.auth().currentUser);
  },

  methods: {
    getData() {
      let dataTable = firebase
        .database()
        .ref("users/" + this.$store.getters.uid);
      dataTable.on("value", res => {
        this.data = res.val();
      });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Logout Success !");
          this.$router.push({ name: Constant.ROUTER_NAME.LOGIN });
        })
        .catch(err => {
          alert(err.message);
        });
    },
    login() {
      this.$router.push({ name: Constant.ROUTER_NAME.LOGIN });
    }
  }
};
</script>

<style scoped></style>
