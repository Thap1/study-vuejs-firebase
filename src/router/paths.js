import Constant from "../util/constant";
import Home from "../components/dashboard/Home";
import Login from "../components/dashboard/Login"
import Register from "../components/dashboard/Register"
import DashboardAdmin from "../components/dashboard/DashboardAdmin";

export default [
  {
    path: "/",
    name: Constant.ROUTER_NAME.HOME,
    component: Home
  },
  {
    path: "/Login",
    name: Constant.ROUTER_NAME.LOGIN,
    component: Login
  },
  {
    path: "/Register",
    name: Constant.ROUTER_NAME.REGISTER,
    component: Register
  },

  {
    path: Constant.ROUTER_PATH.HOME,
    name: Constant.ROUTER_NAME.HOME,
    component: Home
  },
  {
    path: Constant.ROUTER_PATH.DASHBOARD_ADMIN,
    name: Constant.ROUTER_NAME.DASHBOARD_ADMIN,
    component: DashboardAdmin
  }
];
