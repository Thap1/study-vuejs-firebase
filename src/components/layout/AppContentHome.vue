<template>
  <v-row>
    <v-col md="3.5">
      <MainContentLeft style="background: red"></MainContentLeft>
    </v-col>
    <v-col md="5">
        <MainContent></MainContent>
    </v-col>
    <v-col md="3.5">
      <MainContentRight style="background: #ffa100"></MainContentRight>
    </v-col>
  </v-row>
</template>

<script>
import MainContent from "../page-home/MainContent";
import MainContentLeft from "../page-home/MainContentLeft";
import MainContentRight from "../page-home/MainContentRight";
export default {
  name: "AppContentHome",
  components: { MainContentRight, MainContentLeft, MainContent }
};
</script>

<style scoped></style>
