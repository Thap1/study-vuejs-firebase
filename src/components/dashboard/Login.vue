<template>
  <div id="app">
    <v-app id="inspire">
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Login form</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="Login"
                      prepend-icon="person"
                      type="email"
                      v-model="email"
                    ></v-text-field>

                    <v-text-field
                      id="password"
                      label="Password"
                      prepend-icon="lock"
                      type="password"
                      v-model="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="green darken-1" text @click="close">
                    Close
                  </v-btn>
                  <v-spacer></v-spacer>
                  <a @click="register" style="margin-right: 20px;"
                    ><u>create new account?</u></a
                  >
                  <v-btn @click="login()" color="primary">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
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
    close() {
      this.$router.push({ name: Constant.ROUTER_NAME.HOME });
    },
    register() {
      this.$router.push({ name: Constant.ROUTER_NAME.REGISTER });
    }
  }
};
</script>

<style scoped></style>
