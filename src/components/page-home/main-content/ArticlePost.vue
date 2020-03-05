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
      description: "",
      uid: "",
      fullPathImage: "",
      postImage: ""
    };
  },
  computed: {
    buttonImage() {
      return this.image.name ? this.image.name : this.defaultButtonImage;
    }
  },
  methods: {
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
    uploadFile() {
      let imageFile = this.image;
      if (imageFile.name) {
        this.fullPathImage = "/image/" + this.uid + "/" + imageFile.name;
        AuthService.postImage(this.fullPathImage, imageFile).then(() => {
          alert("upload file success");
        });
      }
    },
    getDownload() {
        console.log("this.fullPathImage:", this.fullPathImage)
      return AuthService.getImagePost(this.fullPathImage).getDownloadURL();
    },

    posts() {
      if (!AuthService.isCheckLogin()) {
        bus.$emit("openDialogLogin", true);
      } else {
        this.uid = AuthService.getUid();
        let pathPost = "/post/" + this.uid + "/" + new Date();
        this.uploadFile();
        this.getDownload().then(urlImage => {
          console.log("urlImage", urlImage);
          AuthService.postArticle(
            pathPost,
            this.description,
            urlImage
          ).then(() => {});
        });
      }
    }
  }
};
</script>

<style scoped>
.article-post {
  margin-top: 20px;
}
</style>
