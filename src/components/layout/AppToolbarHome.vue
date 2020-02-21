<template>
  <div class="">
    <v-app-bar app clipped-right color="blue-grey" dark>
      <span class="title ml-3 mr-5"
        >Hello&nbsp;<span class="font-weight-light">World</span></span
      >
      <v-spacer></v-spacer>
      <v-text-field
        just-center
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!isLogin"
        rounded
        color="primary"
        @click="dialogRegister = true"
        >Sign Up</v-btn
      >
      <v-btn v-if="!isLogin" rounded color="primary" @click="dialog = true"
        >Login</v-btn
      >
      <v-btn v-if="isLogin" rounded color="grey" @click="logout()"
        >Logout</v-btn
      >
    </v-app-bar>
    <v-dialog v-model="dialog" max-width="350">
      <v-card>
        <v-card-title class="headline">Login Form</v-card-title>

        <v-card-text>
          <v-flex>
            <v-text-field v-model="email" label="Email"></v-text-field>
            <v-text-field v-model="password" label="Password"></v-text-field>
          </v-flex>
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
            <v-text-field
              v-model="formData.password"
              label="Password"
            ></v-text-field>
            <v-text-field
              v-model="formData.confirmPassword"
              label="Confirm Password"
            ></v-text-field>
            <v-text-field
              v-model="formData.firstName"
              label="First Name"
            ></v-text-field>
            <v-text-field
              v-model="formData.lastName"
              label="Last Name"
            ></v-text-field>
            <v-text-field
              v-model="formData.gender"
              label="Gender"
            ></v-text-field>
            <v-text-field
              v-model="formData.phoneNumber"
              label="Phone Number"
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
// import Constant from "../../util/constant";
import AuthService from "../../service/auth.service";

export default {
  name: "AppToolbarHome",
  data() {
    return {
      email: "",
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
      }
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    login() {
      this.dialog = !this.dialog;
      AuthService.login(this.email, this.password)
        .then(res => {
          this.$store.dispatch("setUid", res.user.uid);
        })
        .catch(err => {
          alert("Oops!" + err.message);
        });
    },
    checkLogin() {}
  },
  logout() {
    this.isLogin = false;
    AuthService.logout();
    // console.log("AuthService.getTokenUid()::::", AuthService.getTokenUid());
  },
  register() {
    AuthService.registerAcc(this.formData);
    this.dialogRegister = !this.dialogRegister;
  }
};
</script>

<style scoped></style>
