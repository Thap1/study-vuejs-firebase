import Constant from "../util/constant";
import Login from "../components/login/Login";
import Home from "../components/dashboard/Home";
import Register from "../components/login/Register";

export default [
  {
    path: "/",
    name: Constant.ROUTER_NAME.HOME,
    component: Home
  },
  {
    path: Constant.ROUTER_PATH.LOGIN,
    name: Constant.ROUTER_NAME.LOGIN,
    component: Login
  },
  {
    path: Constant.ROUTER_PATH.HOME,
    name: Constant.ROUTER_NAME.HOME,
    component: Home
  },
  {
    path: "/Register",
    name: "Register",
    component: Register
  }
];
