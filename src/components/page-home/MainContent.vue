<template>
    <v-container grid-list-md>
      <v-layout wrap column>
        <v-flex xs12>
          <ArticlePost></ArticlePost>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
import ArticlePost from "./main-content/ArticlePost";
export default {
  name: "MainContent",
  components: { ArticlePost }
};
</script>

<style scoped></style>
