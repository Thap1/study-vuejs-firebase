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
            <v-textarea
              v-model="description"
              solo
              label="What's on your mind, Uzir?"
              height="100px"
            >
            </v-textarea>
            <v-btn
              color="primary"
              class="text-none"
              depressed
              :loading="isSelecting"
              @click="onButtonClick()"
            >
              <v-icon left>
                cloud_upload
              </v-icon>
              {{ buttonImage }}
            </v-btn>
            <input
              ref="uploader"
              class="d-none"
              type="file"
              multiple
              accept="image/*"
              @change="onFileChanged"
            />
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="posts()">Đăng bài</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { bus } from "../../../main";
import AuthService from "../../../service/auth.service";
export default {
  name: "ArticlePost",
  data() {
    return {
      image: [],
      defaultButtonImage: "Image Upload",
      isSelecting: false,
      description: ""
    };
  },
  computed: {
    buttonImage() {
      return this.image.name ? this.image.name : this.defaultButtonImage;
    }
  },
  methods: {
    async uploadFile() {
      let imageFile = this.image;
      let uid = AuthService.getUid();
      if (!AuthService.isCheckLogin()) {
        bus.$emit("openDialogLogin", true);
      }
      if (imageFile.name) {
        let pathFile = "image/" + uid + "/" + imageFile.name;
        AuthService.postImage(pathFile, imageFile).then(() => {
          alert("upload file success");
        });
      }
    },
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        {
          once: true
        }
      );
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.image = e.target.files[0];
    },
    posts() {
      this.uploadFile();
      let uid = AuthService.getUid();
      AuthService.postArticle(uid, this.description).then(() => {
        alert("Post Success");
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
