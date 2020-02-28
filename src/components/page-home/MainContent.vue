<template>
  <v-container grid-list-md>
    <v-layout wrap column>
      <v-flex xs12>
        <v-card rounded outlined class="main-content-post">
          <v-card-title>
            <v-layout>
              <v-btn text class="questrial font-weight-bold text-none"
                >Make Post</v-btn
              >
              <v-btn text class="questrial text-none">Live Video</v-btn>
              <v-btn text class="questrial text-none">List</v-btn>
            </v-layout>
          </v-card-title>
          <div class="px-3">
            <v-layout>
              <v-flex xs12>
                <v-text-field
                  class="questrial no-top-padding"
                  background-color="grey lighten-3"
                  height="44px"
                  append-icon="photo_camera sentiment_satisfied"
                  rounded
                  placeholder="What's on your mind, Uzir?"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </div>
        </v-card>
      </v-flex>
      <v-flex d-inline-flex xs6>
        <Posts></Posts>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Posts from "./main-content/Posts";
export default {
  name: "MainContent",
  components: { Posts }
};
</script>

<style scoped>
.main-content-post {
  margin-top: 20px;
}
</style>
