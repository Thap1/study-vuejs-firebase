<template>
  <div>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md3>
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Register form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    prepend-icon="person"
                    type="email"
                    v-model="formData.email"
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    prepend-icon="lock"
                    :type="show ? 'text' : 'password'"
                    v-model="formData.password"
                    class="input-group--focused"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show = !show"
                  ></v-text-field
                  ><v-text-field
                    label="Confirm Password"
                    prepend-icon="lock"
                    :type="show1 ? 'text' : 'password'"
                    class="input-group--focused"
                    v-model="formData.confirmPassword"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show1 = !show1"
                  ></v-text-field
                  ><v-text-field
                    label="First Name"
                    prepend-icon="person"
                    type="text"
                    v-model="formData.firstName"
                  ></v-text-field
                  ><v-text-field
                    label="Last Name"
                    prepend-icon="person"
                    type="text"
                    v-model="formData.lastName"
                  ></v-text-field
                  ><v-select
                    :items="items"
                    label="Gender"
                    prepend-icon="person"
                    v-model="formData.gender"
                  ></v-select>
                  <v-text-field
                    label="Phone Number"
                    prepend-icon="person"
                    type="number"
                    v-model="formData.phoneNumber"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="close" color="green darken-1" text>
                  Close
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="register">Create</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import AuthService from "../../service/auth.service";
import Constant from "../../util/constant";

export default {
  name: "Register",
  data() {
    return {
      items: ["Male", "Female"],
      show: false,
      show1: false,
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
  methods: {
    register() {
      AuthService.registerAcc(this.formData);
      this.$router.push({ name: Constant.ROUTER_NAME.HOME });
      this.dialogRegister = !this.dialogRegister;
    },
    close() {
      this.$router.push({ name: Constant.ROUTER_NAME.HOME });
    }
  }
};
</script>

<style scoped></style>
