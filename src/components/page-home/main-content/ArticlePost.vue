<template>
  <div class="">
    <v-card class="article-post" rounded outlined>
      <v-card-title>
        <h3>
          Tạo bài viết
        </h3>
      </v-card-title>
      <v-card-text>
        <v-layout>
          <v-flex xs12>
            <v-textarea solo label="What's on your mind, Uzir?" height="100px">
            </v-textarea>
            <v-file-input v-model="file">Image</v-file-input>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="uploadFile()">Đăng bài</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "ArticlePost",
  data() {
    return {
      file: []
    };
  },
  methods: {
    uploadFile() {
      // let message = "5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB";
      //   firebase.storage.putString(message, "base64").then(function(snapshot) {
      //   console.log("Uploaded a base64 string!",snapshot);
      //
      // });
      let firebaseStore = firebase.storage().ref();
      let uploadImage = firebaseStore.child("image");
      uploadImage.put(this.file).then(ref => {
        console.log("ref::", ref);
        console.log("file:::", this.file);
      });
    }
  }
};
</script>

<style scoped>
.article-post {
  margin-top: 20px;
}
</style>
