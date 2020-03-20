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
      <v-btn
        @click="dialogRegister = true"
        color="primary"
        rounded
        v-if="!isLogin"
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
    <v-dialog v-model="dialogRegister" max-width="420px">
      <v-card>
        <v-card-title class="headline">Register Form</v-card-title>
        <v-card-text>
          <v-flex>
            <v-text-field v-model="formData.email" label="Email"></v-text-field>
            <v-select
              v-model="select"
              :items="role"
              label="Select Role"
            ></v-select>

            <v-text-field
              label="Password"
              v-model="formData.password"
            ></v-text-field>
            <v-text-field
              label="Confirm Password"
              v-model="formData.confirmPassword"
            ></v-text-field>
            <v-text-field
              label="First Name"
              v-model="formData.firstName"
            ></v-text-field>
            <v-text-field
              label="Last Name"
              v-model="formData.lastName"
            ></v-text-field>
            <v-text-field
              label="Gender"
              v-model="formData.gender"
            ></v-text-field>
            <v-text-field
              label="Phone Number"
              v-model="formData.phoneNumber"
            ></v-text-field>
          </v-flex>
        </v-card-text>
        <v-card-actions>
          <div style="width: 100%" class="d-flex justify-space-between">
            <v-btn color="green darken-1" text @click="dialogRegister = false">
              Close
            </v-btn>
            <v-btn color="primary" @click="register()">Create</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AuthService from "../../service/auth.service";
import { bus } from "../../main";
import Constant from "../../util/constant";

export default {
  name: "AppToolbarHome",
  data() {
    return {
      email: "",
      select: null,
      password: "",
      isLogin: false,
      dialog: false,
      dialogRegister: false,
      formData: {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        gender: "",
        phoneNumber: ""
      },
      role: ["User", "Admin", "Shop"]
    };
  },
  created() {
    this.checkLogin();
    bus.$on("openDialogLogin", value => {
      this.dialog = value;
    });
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
      AuthService.registerAcc(this.formData);
      this.dialogRegister = !this.dialogRegister;
    },
    setRole() {
      this.$store.dispatch();
    }
  }
};
</script>

<style scoped></style>
