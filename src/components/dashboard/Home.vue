<template>
  <v-container>
    <v-btn @click="login()">Login</v-btn>
    <v-btn @click="getData()">Get Data</v-btn>
    <v-btn @click="logout()"> Logout</v-btn>
    <p>{{ data }}</p>
  </v-container>
</template>

<script>
import firebase from "firebase";
import Constant from "../../util/constant";

export default {
  name: "Home",
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
