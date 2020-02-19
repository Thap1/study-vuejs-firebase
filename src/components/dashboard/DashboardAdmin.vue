<template>
  <v-app>
    <div id="app">
      <v-app id="inspire">
        <AppToolBar></AppToolBar>
        <AppDrawer></AppDrawer>
        <v-content>
          <v-container fluid fill-height>
            <v-layout justify-center align-center>
              <router-view></router-view>
            </v-layout>
          </v-container>
        </v-content>
        <AppFooter></AppFooter>
      </v-app>
    </div>
  </v-app>
</template>

<script>
import AppToolBar from "../layout/AppToolbar";
import AppDrawer from "../layout/AppDrawer";
import AppFooter from "../layout/AppFooter";
export default {
  name: "DashboardAdmin",
  components: { AppFooter, AppDrawer, AppToolBar }
};
</script>

<style scoped></style>
