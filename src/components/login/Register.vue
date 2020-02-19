<template>
  <v-container>
    <v-card style="width: 400px; margin: auto; padding: inherit">
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
          <v-text-field v-model="formData.gender" label="Gender"></v-text-field>
        </v-flex>
      </v-card-text>
      <v-card-actions>
        <div style="width: 100%" class="d-flex justify-space-between">
          <v-btn><router-link to="/">Back</router-link></v-btn>
          <v-btn right color="primary" @click="register()">Create</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Register",
  data() {
    return {
      formData: {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        gender: ""
      }
    };
  },

  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
        .then(res => {
          this.writeUserData(res.user.uid);
          firebase
            .auth()
            .signOut()
            .then(() => {
              alert("Created User !!!");
              this.$router.push("/");
            });
        })
        .catch(err => {
          alert("Oops!!" + err.message);
        });
    },
    writeUserData(uid) {
      firebase
        .database()
        .ref("users/" + uid)
        .set({
          firstName: this.formData.firstName,
          lastName: this.formData.lastName,
          email: this.formData.email,
          gender: this.formData.gender
        });
    }
  }
};
</script>

<style scoped></style>
