import Vue from "vue";
import VueRouter from "vue-router";
import paths from "./paths";
import firebase from "firebase";
import Constant from "../util/constant";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: paths
});
router.beforeEach((to, from, next) => {
  console.log("to::::", to);


  firebase.auth().onAuthStateChanged(userAuth => {
    console.log("userAuth", userAuth);
    if (userAuth) {
      firebase
        .auth()
        .currentUser.getIdTokenResult()
        .then(res => {
          console.log("Res.admin:::", res.claims.admin);
          console.log("Res.user:::", res.claims.user);
          if (res.claims.admin) {
            if (to.path !== Constant.ROUTER_PATH.DASHBOARD_ADMIN) {
              return next({ path: Constant.ROUTER_PATH.DASHBOARD_ADMIN });
            }
          } else if (res.claims.user) {
            if (to.path !== Constant.ROUTER_PATH.HOME) {
              return next({ path: Constant.ROUTER_PATH.HOME });
            }
          } else {
            if (to.matched.some(res => res.meta.auth)) {
              next({
                path: Constant.ROUTER_PATH.HOME,
                query: {
                  redirect: to.fullPath
                }
              });
            }
          }
        });
    } else {
      next({
        path: Constant.ROUTER_PATH.HOME
      });
    }
  });
  next();
});
export default router;
