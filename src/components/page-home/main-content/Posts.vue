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
              >Jeanett Sun</v-list-item-title
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
      <v-layout wrap>
        <v-flex xs6>
          <!--        <v-card flat tile>-->
          <!--          <v-img-->
          <!--            :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"-->
          <!--            :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"-->
          <!--            aspect-ratio="1"-->
          <!--            class="grey lighten-2"-->
          <!--          >-->
          <!--            <template v-slot:placeholder>-->
          <!--              <v-layout fill-height align-center justify-center ma-0>-->
          <!--                <v-progress-circular-->
          <!--                  indeterminate-->
          <!--                  color="grey lighten-5"-->
          <!--                ></v-progress-circular>-->
          <!--              </v-layout>-->
          <!--            </template>-->
          <!--          </v-img>-->
          <!--        </v-card>-->
        </v-flex>
      </v-layout>
      <!-- action and icon -->
      <v-card-text>
        <div class="questrial body1 mb-4">{{ lorem }}</div>
        <v-divider></v-divider>

        <v-divider></v-divider>
      </v-card-text>
      <!--    show comment-->
      <!--    <v-list-item style="align-items:normal">-->
      <!--      <v-list-item-avatar>-->
      <!--        <img :src="avatar1" alt="John" />-->
      <!--      </v-list-item-avatar>-->
      <!--      <v-list-item-content>-->
      <!--        <div class="questrial font-weight-bold" style="font-size: 14px">-->
      <!--          Daniel Frazier-->
      <!--        </div>-->
      <!--        <v-list-item-subtitle-->
      <!--          class="questrial body1 grey--text text--darken-1 my-2"-->
      <!--          >I like this a lot. Good day Jean!</v-list-item-subtitle-->
      <!--        >-->
      <!--        <v-layout>-->
      <!--          <v-flex xs4>-->
      <!--            <v-layout row>-->
      <!--              <div-->
      <!--                class="questrial caption indigo--text font-weight-bold ml-1 mr-3"-->
      <!--              >-->
      <!--                Like-->
      <!--              </div>-->
      <!--              <div class="questrial caption indigo--text font-weight-bold mr-3">-->
      <!--                Reply-->
      <!--              </div>-->
      <!--              <div class="questrial caption indigo--text font-weight-bold mr-3">-->
      <!--                Translate-->
      <!--              </div>-->
      <!--              <div class="questrial grey--text caption font-weight-bold ml-3">-->
      <!--                5mins-->
      <!--              </div>-->
      <!--            </v-layout>-->
      <!--          </v-flex>-->
      <!--        </v-layout>-->
      <!--      </v-list-item-content>-->
      <!--    </v-list-item>-->
      <!--   input comment-->
      <!--    <div class="px-4">-->
      <!--      <v-text-field-->
      <!--        class="questrial"-->
      <!--        height="45px"-->
      <!--        background-color="grey lighten-3"-->
      <!--        append-icon="photo_camera sentiment_satisfied"-->
      <!--        placeholder="Write a comment..."-->
      <!--        rounded-->
      <!--      ></v-text-field>-->
      <!--    </div>-->
      <v-btn @click="userPost()">Click</v-btn>
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
    // this.userPost()
  },
  methods: {
    getPosts() {
      let pathPost = "/post";
      // let dataConvert= []
      AuthService.getPostArticle(pathPost).on("value", res => {
        let data = [];
        res.forEach(result => {
          data.push(result.val());
          this.dataPost = data;
        });
      });
    },
    userPost() {
      let convert = JSON.parse(JSON.stringify(this.dataPost));
      console.log("convert", convert);
      for (let i = 0; i <= convert.length - 1; i++) {
        console.log(convert[i].uid);
      }
    }
  }
};
</script>

<style scoped>
.article-post {
  margin-top: 10px;
}
</style>
