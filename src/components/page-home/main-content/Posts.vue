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
            <v-list-item-title class="subtitle questrial"
              >{{ item.lastName }} {{ item.firstName }}</v-list-item-title
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

      <v-menu attach open-on-hover top offset-y min-width="200px">
        <template v-slot:activator="{ on }">
          <v-flex v-on="on">
            <v-layout>
              <v-avatar size="20" class="ml-1">
                <v-img
                  src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/65/heavy-black-heart_2764.png"
                >
                </v-img>
              </v-avatar>
              <v-avatar size="20" class="ml-1">
                <v-img
                  src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/65/smiling-face-with-open-mouth-and-smiling-eyes_1f604.png"
                >
                </v-img>
              </v-avatar>
              <v-avatar size="20" class="ml-1">
                <v-img
                  src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/65/heavy-black-heart_2764.png"
                >
                </v-img>
              </v-avatar>
              <div class="questrial ml-3">+15</div>
              <v-spacer></v-spacer>
              <v-flex class="text-right">
                <v-layout wrap justify-end>
                  <div class="questrial mr-3 font-weight-bold ">
                    2 Comments
                    <v-icon v-if="false" small>keyboard_arrow_down</v-icon>
                    <v-icon small>keyboard_arrow_up</v-icon>
                  </div>
                  <div class="questrial ml-2 font-weight-bold mr-2">
                    Share
                  </div>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </template>
      </v-menu>

      <!-- action and icon -->

      <v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-md-space-between">
          <v-btn
            @click="likePost(index)"
            text
            class="questrial font-weight-bold text-none"
            color="blue"
          >
            <span>Like</span>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn text class="questrial font-weight-bold text-none">
            <span>Comment</span>
            <v-icon>comment</v-icon>
          </v-btn>
          <v-btn text class="questrial font-weight-bold text-none">
            <span>Share</span>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
        </v-card-actions>
        <!--        <div class="questrial body1 mb-4">{{ lorem }}</div>-->
        <v-divider></v-divider>
        <v-layout class="py-4"> </v-layout>
        <v-divider></v-divider>
      </v-card-text>

      <!--    show comment-->
      <!--          <v-list-item style="align-items:normal">-->
      <!--            <v-list-item-avatar>-->
      <!--              <img :src="avatar1" alt="John" />-->
      <!--            </v-list-item-avatar>-->
      <!--            <v-list-item-content>-->
      <!--              <div class="questrial font-weight-bold" style="font-size: 14px">-->
      <!--                Daniel Frazier-->
      <!--              </div>-->
      <!--              <v-list-item-subtitle-->
      <!--                class="questrial body1 grey&#45;&#45;text text&#45;&#45;darken-1 my-2"-->
      <!--                >I like this a lot. Good day Jean!</v-list-item-subtitle-->
      <!--              >-->
      <!--              <v-layout>-->
      <!--                <v-flex xs4>-->
      <!--                  <v-layout row>-->
      <!--                    <div-->
      <!--                      class="questrial caption indigo&#45;&#45;text font-weight-bold ml-1 mr-3"-->
      <!--                    >-->
      <!--                      Like-->
      <!--                    </div>-->
      <!--                    <div class="questrial caption indigo&#45;&#45;text font-weight-bold mr-3">-->
      <!--                      Reply-->
      <!--                    </div>-->
      <!--                    <div class="questrial caption indigo&#45;&#45;text font-weight-bold mr-3">-->
      <!--                      Translate-->
      <!--                    </div>-->
      <!--                    <div class="questrial grey&#45;&#45;text caption font-weight-bold ml-3">-->
      <!--                      5mins-->
      <!--                    </div>-->
      <!--                  </v-layout>-->
      <!--                </v-flex>-->
      <!--              </v-layout>-->
      <!--            </v-list-item-content>-->
      <!--          </v-list-item>-->
      <!--         input comment-->
      <div class="px-4">
        <v-text-field
          class="questrial"
          height="45px"
          background-color="grey lighten-3"
          append-icon="photo_camera sentiment_satisfied"
          placeholder="Write a comment..."
          rounded
        ></v-text-field>
        <v-btn @click="colorLike()">Click</v-btn>
      </div>
      <!--      <v-btn @click="userPost()">Click</v-btn>-->
    </v-card>
  </div>
</template>

<script>
import AuthService from "../../../service/auth.service";

export default {
  components: {},
  data() {
    return {
      dataPost: [],
      dataKey: [],
      avatar1: "",
      avatar2: "",
      avatar3: "",
      lorem: `xxxxx`
    };
  },
  created() {
    this.getPosts();
  },
  updated() {
    // console.log("data:::", this.dataPost);
    // this.colorLike()
  },
  methods: {
    getPosts() {
      let pathPost = "/post";
      let pathTime = "createdAt";
      AuthService.getPostArticle(pathPost, pathTime).on("value", res => {
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
    async likePost(index) {
      let path =
        "/post/" +
        this.dataPost[index].key +
        "/like/" +
        (await AuthService.getUid());

      let dataLike = {
        isLike: true
      };
      AuthService.setLikePost(path, dataLike).then(() => alert("Like Ok!"));
      // let pathDel =
      //   "/post/" +
      //   this.dataPost[index].key +
      //   "/like" +
      //   (await AuthService.getUid());

      // AuthService.setDisLikePost(pathDel).then(() => alert("DisLike Ok!"));
    },
     colorLike() {
      // let uid = await AuthService.getUid()
       console.log("dataPOST:::", this.dataPost)
      for (let i = 0; i <= this.dataPost.length - 1; i++) {
        let likeObject = this.dataPost[i];
        let AAA= Object.keys(likeObject)
        console.log("like:::", AAA.like);
      }
      // return true
    }
  }
};
</script>

<style scoped>
.article-post {
  margin-top: 10px;
}
</style>
