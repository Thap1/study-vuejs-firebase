<template>

    <v-row>
      <v-col md="3">
        <MainContentLeft style="background: red"></MainContentLeft>
      </v-col>
      <v-col md="6">
        <v-card>
          <MainContent style="background: #039be5"></MainContent>
        </v-card>
      </v-col>
      <v-col md="3">
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
  components: {MainContentRight, MainContentLeft, MainContent }
};
</script>

<style scoped></style>
