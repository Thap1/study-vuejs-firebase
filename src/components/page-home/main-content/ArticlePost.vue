<template>
  <div class="">
    <v-card class="article-post" rounded outlined>
      <v-card-title>
        <span>
          Create New a Post
        </span>
      </v-card-title>
      <v-card-text>
        <v-layout>
          <v-flex xs12>
            <v-textarea
              v-model="description"
              solo
              label="What's on your mind?"
              height="100px"
            >
            </v-textarea>
            <v-img
              v-if="imageName"
              :src="imageUrl"
              max-height="70px"
              max-width="70px"
            ></v-img>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="primary"
                  class="text-none"
                  style="margin-top: 3%;"
                  depressed
                  :loading="isSelecting"
                  @click="onButtonClick()"
                  v-on="on"
                >
                  <v-icon left>
                    cloud_upload
                  </v-icon>
                  <span class="hidden-text">{{ buttonImage }}</span>
                </v-btn>
              </template>
              <span>{{ buttonImage }}</span>
            </v-tooltip>
            <ImageUploader
              class=""
              :preview="true"
              :className="['fileinput', { 'fileinput--loaded': hasImage }]"
              capture="environment"
              :debug="1"
              doNotResize="gif"
              :quaquality="0.7"
              :autoRotate="true"
              outputFormat="verbose"
              @input="setImage"
            >
              <label for="fileInput" slot="upload-label">
                <figure>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <path
                      class="path1"
                      d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
                    ></path>
                  </svg>
                </figure>
                <span class="upload-caption">{{
                  hasImage ? "Replace" : "Click to upload"
                }}</span>
              </label>
              <!--              <input-->
              <!--                slot="upload-label"-->
              <!--                ref="fileinput"-->
              <!--                type="file"-->
              <!--                multiple-->
              <!--                accept="image/*"-->
              <!--                @change="onFileChanged"-->
              <!--              />-->
            </ImageUploader>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="posts()">Post</v-btn>
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
      isCheckLogin: "",
      storeUid: "",
      image: [],
      defaultButtonImage: "Image Upload",
      isSelecting: false,
      description: "",
      fullPathImage: "",
      postImage: "",
      imageName: "",
      imageUrl: "",
      hasImage: false,
      imageTest: null
    };
  },
  computed: {
    buttonImage() {
      return this.imageName ? this.imageName : this.defaultButtonImage;
    }
  },
  created() {
    if (AuthService.isCheckLogin()) {
      this.isCheckLogin = AuthService.isCheckLogin();
      this.storeUid = this.$store.getters.uid;
    }
  },
  watch: {
    image: "isCheckImage"
  },

  methods: {
    setImage(output) {
      this.hasImage = true;
      this.imageTest = output;
      console.log("Info", output.info);
      console.log("Info", output);
      console.log("Exif", output.exif);
    },
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
      this.$refs.fileinput.click();
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

    getUser() {
      let pathUser = "/users/" + this.storeUid;
      return AuthService.getUser(pathUser);
    },

    async posts() {
      if (!this.isCheckLogin) {
        bus.$emit("openDialogLogin", true);
      } else {
        let _firstName;
        let _laseName;
        await this.getUser().then(res => {
          _firstName = res.val().firstName;
          _laseName = res.val().lastName;
        });
        let dataPost = {
          uid: this.storeUid,
          description: this.description,
          urlImage: "",
          firstName: _firstName,
          lastName: _laseName
        };
        let pathPost = "/post";
        if (this.imageName && this.description) {
          await this.uploadFile();

          this.getDownloadImage().then(res => {
            dataPost.urlImage = res;
            AuthService.postArticle(pathPost, dataPost).then(() => {
              alert("Post Ok ");
              this.description = "";
              this.image = "";
            });
          });
        } else if (!this.imageName && this.description) {
          AuthService.postArticle(pathPost, dataPost).then(() => {
            alert("Post Ok ");
            this.description = "";
          });
        } else alert("Please! Title Post");
      }
    }
  }
};
</script>

<style scoped>
#fileInput {
  display: none;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.my-8 {
  margin-top: 4rem;
  margin-bottom: 4rem;
}
.article-post {
  margin-top: 15px;
}
.hidden-text {
  display: block;
  margin-left: 2px;
  max-width: 150px;
  overflow: hidden;
  padding-left: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
