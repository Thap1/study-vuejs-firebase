<template>
  <div class="">
    <v-app-bar app clipped-right color="blue-grey" dark>
      <span class="title ml-3 mr-5"
        >Hello&nbsp;<span class="font-weight-light">World</span></span
      >
      <v-spacer></v-spacer>
      <v-text-field
        flat
        hide-details
        just-center
        label="Search"
        prepend-inner-icon="search"
        solo-inverted
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn @click="register" color="primary" rounded v-if="!isLogin"
        >Sign Up
      </v-btn>
      <v-btn v-if="!isLogin" rounded color="primary" @click="login"
        >Login
      </v-btn>
      <v-btn v-if="isLogin" rounded color="grey" @click="logout()"
        >Logout
      </v-btn>
    </v-app-bar>
    <v-dialog v-model="dialog" max-width="350">
      <v-card>
        <v-card-title class="headline">warning Login</v-card-title>

        <v-card-text>
          <p>Please! You can Login after Post.</p>
        </v-card-text>
        <v-card-actions>
          <div style="width: 100%" class="d-flex justify-space-between">
            <v-btn color="green darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="primary" @click="login()">Login</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AuthService from "../../service/auth.service";
// import { bus } from "../../main";
import Constant from "../../util/constant";

export default {
  name: "AppToolbarHome",
  data() {
    return {
      isLogin: false,
      dialog: false
    };
  },
  created() {
    this.checkLogin();
    // bus.$on("openDialogLogin", value => {
    //   this.dialog = value;
    // });
  },

  methods: {
    login() {
      this.$router.push({ name: Constant.ROUTER_NAME.LOGIN });
    },
    checkLogin() {
      if (AuthService.isCheckLogin()) {
        this.isLogin = true;
      } else this.isLogin = false;
    },
    async logout() {
      AuthService.logout().then(() => {
        this.checkLogin();
      });
    },
    register() {
      this.$router.push({ name: Constant.ROUTER_NAME.REGISTER });
    }
  }
};
</script>

<style scoped></style>
