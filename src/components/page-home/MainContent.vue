<template>
  <v-container grid-list-md>
    <v-layout wrap column>
      <v-flex xs12>
        <ArticlePost></ArticlePost>
      </v-flex>
      <v-flex d-inline-flex xs12>
        <Posts />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ArticlePost from "./main-content/ArticlePost";
import Posts from "./main-content/Posts";
export default {
  name: "MainContent",
  components: { Posts, ArticlePost }
};
</script>

<style scoped></style>
