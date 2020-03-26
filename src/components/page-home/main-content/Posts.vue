<template>
  <div>
    <v-card
      class="article-post"
      rounded
      outlined
      width="100%"
      v-for="(item, index) in dataPost"
      :key="index"
    >
      <div>
        <v-list-item>
          <v-list-item-avatar>
            <img v-if="item.urlImage" :src="item.urlImage" />
            <img v-else src="../../../assets/imagePost/avata_image.jpg" />
          </v-list-item-avatar>
          <v-list-item-content class="mt-2">
            <v-list-item-title class="subtitle questrial">
              {{ item.firstName }} {{ item.lastName }}</v-list-item-title
            >
            <v-list-item-subtitle class="questrial caption blue--text"
              >Colleagues</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <v-icon>more_horiz</v-icon>
          </v-list-item-action>
        </v-list-item>
      </div>
      <!-- <v-container grid-list-xs fluid style="padding:10px"> -->
      <v-card-text>
        <p class="font-weight-regular mb-4">{{ item.description }}</p>
      </v-card-text>
      <v-row v-if="item.urlImage" align="center" justify="center">
        <v-img
          :src="item.urlImage"
          :lazy-src="item.urlImage"
          aspect-ratio="1"
          class="grey lighten-2"
          max-width="94%"
          max-height="400px"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-row>
      <v-card-text>
        <v-menu attach open-on-hover top offset-y min-width="200px">
          <template v-slot:activator="{ on }">
            <v-flex v-on="on">
              <v-layout v-if="item.like">
                <v-avatar size="20" class="ml-1">
                  <v-img
                    src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/65/heavy-black-heart_2764.png"
                  >
                  </v-img>
                </v-avatar>

                <div class="questrial ml-3">{{ countLikes(item.like) }}</div>
                <v-spacer></v-spacer>
                <v-flex class="text-right">
                  <v-layout wrap justify-end>
                    <div
                      v-if="item.comment"
                      class="questrial  mr-3 font-weight-bold "
                    >
                      {{
                        Object.keys(item.comment).length
                          ? Object.keys(item.comment).length
                          : ""
                      }}
                      Comment
                      <!--                      <v-icon v-if="false" small>keyboard_arrow_down</v-icon>-->
                      <!--                      <v-icon small>keyboard_arrow_up</v-icon>-->
                    </div>
                    <!--                    <div class="questrial ml-2 font-weight-bold mr-2">-->
                    <!--                      Share-->
                    <!--                    </div>-->
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </template>
        </v-menu>
      </v-card-text>
      <!-- action and icon -->

      <v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-md-space-between">
          <v-btn
            @click="likePost(index, item.like)"
            text
            class="font-weight-bold text-none ma-2"
            :color="colorLike(item.like)"
          >
            <v-icon right>thumb_up</v-icon>
            Like
          </v-btn>
          <v-btn
            text
            class="font-weight-bold text-none ma-2"
            color="#666666"
            @click="commentPost(index)"
          >
            <v-icon right>comment</v-icon>
            Comment
          </v-btn>
          <v-btn text class="font-weight-bold text-none" color="#666666">
            <span>Share</span>
          </v-btn>
        </v-card-actions>
        <!--        <div class="questrial body1 mb-4">{{ lorem }}</div>-->
        <v-divider></v-divider>
      </v-card-text>
      <!--          show comment-->

      <v-list-item
        style="align-items:normal"
        v-for="(itemComment, indexComment) in item.comment"
        :key="indexComment"
      >
        <v-list-item-avatar>
          <img v-if="false" src="../../../assets/imagePost/avata_image.jpg" />
          <img v-else src="../../../assets/imagePost/avata_image.jpg" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list
            rounded
            style="background: rgb(239, 239, 239);border-radius: 15px"
          >
            <div>
              <span
                v-if="itemComment.firstName"
                class="post-comment-name font-weight-bold "
                style=""
                >{{ itemComment.firstName }}&#32;{{ itemComment.lastName }}
              </span>
              <span class="post-text-comment"
                >{{ itemComment.contentComment }}
              </span>
            </div>
          </v-list>
          <v-layout>
            <v-flex>
              <v-layout row>
                <span class=" caption indigo--text font-weight-bold ml-1 mr-3">
                  Like
                </span>
                <span class=" caption indigo--text font-weight-bold mr-3">
                  Reply
                </span>
                <span class=" caption indigo--text font-weight-bold mr-3">
                  Translate
                </span>
                <div class="questrial grey--text caption font-weight-bold ml-3">
                  {{ timeComment(itemComment.createAt) }}
                </div>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-list-item-content>
      </v-list-item>

      <div class="px-4">
        <v-text-field
          class="questrial"
          height="45px"
          background-color="grey lighten-3"
          placeholder="Write a comment..."
          rounded
          v-model.trim="item.contentComment"
          @keyup.enter="
            item.contentComment ? commentPost(index, item.contentComment) : ''
          "
        ></v-text-field>
      </div>
    </v-card>
    <ScrollLoader :loader-method="loadingPage" :loader-disable="disable">
    </ScrollLoader>
  </div>
</template>

<script>
import AuthService from "../../../service/auth.service";

export default {
  name: "Posts",
  data() {
    return {
      disable: false,
      postLimit: 3,
      dataPost: [],
      likeColor: "",
      uid: "",
      isCheckLogin: "",
      pathPost: "/post",
      getTime: "createdAt"
    };
  },
  created() {
    this.getPosts();
  },
  watch: {
    postLimit: "callApi"
  },

  methods: {
    getPosts() {
      if (AuthService.isCheckLogin()) {
        this.uid = this.$store.getters.uid;
        this.isCheckLogin = AuthService.isCheckLogin();
      }
      this.callApi();
    },
    callApi() {
      AuthService.getPostArticle(this.pathPost, this.getTime)
        .limitToLast(this.postLimit)
        .on("value", res => {
          let data = [];
          res.forEach(result => {
            let item = result.val();
            item.key = result.key;
            data.push(item);
            this.dataPost = data;
          });
          this.dataPost.reverse();
        });
    },
    loadingPage() {
      if (this.postLimit < 20) {
        this.postLimit = 3 + this.postLimit;
      }
    },
    colorLike(param) {
      if (this.isCheckLogin) {
        if (param) {
          let uidLike = Object.keys(param);
          if (uidLike.includes(this.uid)) {
            return "blue";
          } else return "#666666";
        } else return "#666666";
      } else return "#666666";
    },

    likePost(index, param) {
      if (this.isCheckLogin) {
        let path = "/post/" + this.dataPost[index].key + "/like/" + this.uid;
        let dataLike = {
          isLike: true
        };
        if (param) {
          let uidLike = Object.keys(param);
          if (uidLike.includes(this.uid)) {
            AuthService.setDisLikePost(path);
          } else {
            AuthService.setLikePost(path, dataLike);
          }
        } else {
          AuthService.setLikePost(path, dataLike);
        }
      } else {
        return false;
      }
    },
    countLikes(param) {
      if (param) {
        let uidLike = Object.keys(param);
        return uidLike.length;
      } else return "";
    },

    async commentPost(index, contentComment) {
      if (this.isCheckLogin) {
        let _firstName = "";
        let _lastName = "";
        let pathUser = "/users/" + this.uid;
        await AuthService.getUser(pathUser).then(res => {
          _firstName = res.val().firstName;
          _lastName = res.val().lastName;
        });
        let path = "/post/" + this.dataPost[index].key + "/comment/";
        let param = {
          lastName: _firstName,
          firstName: _lastName,
          contentComment: contentComment.trim()
        };
        AuthService.setCommentPost(path, param)
          .then(() => {
            contentComment = "";
          })
          .catch(err => {
            alert("Error " + err);
          });
      }
    },
    timeComment(time) {
      let dateNow = Date.now();
      let dateComment = new Date(time);

      let res = Math.abs(dateNow - dateComment) / 1000;

      let hours = Math.floor(res / 3600) % 24;

      let minutes = Math.floor(res / 60) % 60;

      let days = Math.floor(res / 86400);
      let result = "";
      if (days === 0) {
        if (hours === 0) {
          result = minutes + " min";
        } else result = hours + " hour";
      } else result = days + " day";
      return result;
    }
  },
  destroyed() {
    let pathPost = "/post";
    let pathTime = "createdAt";
    AuthService.getPostArticle(pathPost, pathTime).off();
  }
};
</script>

<style scoped>
.post-text-comment {
  font-family: inherit;
  font-size: 15px;
  line-height: 16px;
  color: #1c1e21;
  margin-left: 10px;
}
.post-comment-name {
  font-family: inherit;
  line-height: 16px;
  font-size: 15px;
  color: #385898;
}
.article-post {
  margin-top: 10px;
}
</style>
