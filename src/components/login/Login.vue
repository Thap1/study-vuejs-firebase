<template>
  <v-container>
    <v-card style="width: 400px; margin: auto; padding: inherit">
      <v-card-text>
        <v-flex>
          <v-text-field v-model="email" label="Email"></v-text-field>
          <v-text-field v-model="password" label="Password"></v-text-field>
        </v-flex>
      </v-card-text>
      <v-card-actions>
        <div style="width: 100%" class="d-flex justify-space-between">
          <span><router-link to="/Register">create user</router-link></span>
          <v-btn right color="primary" @click="login()">Login</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import AuthService from "../../service/auth.service";
import firebase from "firebase";
import Constant from "../../util/constant";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },

  name: "Login",
  created() {
    firebase.auth().onAuthStateChanged(userAuth => {
      if (userAuth) {
        firebase.auth().currentUser.getIdTokenResult()
        .then(tokenResult => {
          console.log("ssssssssssss::::",tokenResult.claims);
        });
      }
    });
  },

  methods: {
    login() {
      AuthService.login(this.email, this.password)
        .then(res => {
          this.$router.push({ name: Constant.ROUTER_NAME.HOME });
          alert("Ok !");
          this.$store.dispatch("setUid", res.user.uid);
        })
        .catch(err => {
          alert("Oops!" + err.message);
        });
    }
  }
};
</script>

<style scoped></style>
