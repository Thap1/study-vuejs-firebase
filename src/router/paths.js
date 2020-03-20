import Constant from "../util/constant";
import Home from "../components/dashboard/Home";
import Login from "../components/dashboard/Login"
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
