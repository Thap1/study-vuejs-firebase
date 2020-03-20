<template>
  <v-container>
    <v-card max-width="auto">
      <v-card-title class="headline">Login Form</v-card-title>

      <v-card-text>
        <v-flex>
          <v-text-field v-model="email" label="Email"></v-text-field>
          <v-text-field v-model="password" label="Password"></v-text-field>
        </v-flex>
      </v-card-text>
      <v-card-actions>
        <div style="width: 100%" class="d-flex justify-space-between">
          <v-btn color="green darken-1" text @click="Close">
            Close
          </v-btn>
          <v-btn color="primary" @click="login()">Login</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import AuthService from "../../service/auth.service";
import Constant from "../../util/constant";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      AuthService.login(this.email, this.password)
        .then(res => {
          this.$store.dispatch("setUid", res.user.uid);
          this.$router.push({ name: Constant.ROUTER_NAME.HOME });
        })
        .catch(err => {
          alert("Oops!" + err.message);
        });
    },
    Close() {
      this.$router.push({ name: Constant.ROUTER_NAME.HOME });
    }
  }
};
</script>

<style scoped></style>
