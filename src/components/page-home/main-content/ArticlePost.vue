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
            <v-file-input
              accept="image/png, image/jpeg, image/bmp"
              show-size
              counter
              multiple
              v-model="image"
            />
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
      image: []
    };
  },
  methods: {
    async uploadFile() {
      let imageFile = this.image;
      if (imageFile) {
        for (let i = 0; i < imageFile.length; i++) {
          let base64Image = await this.convertToBase64(imageFile[i]);
          let firebaseStore = firebase.storage().ref();
          let uploadImage = firebaseStore.child("image/mountain.jpg" + i);
          uploadImage.putString(base64Image, "data_url")
        }
      }
    },
    convertToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
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
