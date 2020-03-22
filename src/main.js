import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ScrollLoader from "vue-scroll-loader";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";
import { ValidationProvider } from "vee-validate";

Vue.config.productionTip = false;
Vue.use(ScrollLoader);
Vue.component("ValidationProvider", ValidationProvider);
// Vue.component("ScrollLoader", ScrollLoader);
let app = "";
firebase.initializeApp({
  apiKey: "AIzaSyDqhok_4rAPoXfJS4Qiz5IkOAcC7g4sHcc",
  authDomain: "study-vuejs-login.firebaseapp.com",
  databaseURL: "https://study-vuejs-login.firebaseio.com",
  projectId: "study-vuejs-login",
  storageBucket: "study-vuejs-login.appspot.com",
  messagingSenderId: "260015972605",
  appId: "1:260015972605:web:95ee813882273787a41e94",
  measurementId: "G-CPMV09Q3PD"
});

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});
