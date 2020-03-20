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
            <v-img
              v-if="imageName"
              :src="imageUrl"
              max-height="70px"
              max-width="70px"
            ></v-img>
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
      postImage: "",
      imageName: "",
      imageUrl: ""
    };
  },
  computed: {
    buttonImage() {
      return this.imageName ? this.imageName : this.defaultButtonImage;
    }
  },
  created() {},
  watch: {
    image: "isCheckImage"
  },

  methods: {
    isCheckImage() {
      if (this.image.name) {
        this.fullPathImage = "/image/" + this.image.name;
        let index = this.image.name.lastIndexOf(".");
        this.imageName = this.image.name.slice(0, index);
        const fr = new FileReader();
        fr.readAsDataURL(this.image);
        fr.addEventListener("load", () => {
          this.imageUrl = fr.result;
        });
      }
    },
    onFileChanged(e) {
      if (e.target.files.length > 0) {
        this.image = e.target.files[0];
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
    uploadFile() {
      let imageFile = this.image;
      if (this.imageName) {
        return AuthService.postImage(this.fullPathImage, imageFile);
      }
    },
    getDownloadImage() {
      return AuthService.getImagePost(this.fullPathImage).getDownloadURL();
    },

    async getUser() {
      let pathUser = "/users/" + (await AuthService.getUid());
      return AuthService.getUser(pathUser);
    },

    async posts() {
      if (!AuthService.isCheckLogin()) {
        bus.$emit("openDialogLogin", true);
      } else {
        let _firstName;
        let _laseName;
        await this.getUser().then(res => {
          _firstName = res.val().firstName;
          _laseName = res.val().lastName;
        });

        this.getUser();
        let dataPost = {
          uid: await AuthService.getUid(),
          description: this.description,
          urlImage: "",
          firstName: _firstName,
          lastName: _laseName,
        };
        let pathPost = "/post";
        if (this.imageName && this.description) {
          await this.uploadFile().then(() => {
            alert("Post Ok Image");
          });
          this.getDownloadImage().then(res => {
            dataPost.urlImage = res;
            AuthService.postArticle(pathPost, dataPost);
          });
        } else if (!this.imageName && this.description) {
          AuthService.postArticle(pathPost, dataPost).then(() => {
            alert("Post Ok ");
          });
        } else alert("Please! Title Post");
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
