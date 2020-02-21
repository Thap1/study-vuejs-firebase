import Constant from "../util/constant";
import Home from "../components/dashboard/Home";
import DashboardAdmin from "../components/dashboard/DashboardAdmin";

export default [
  {
    path: "/",
    name: Constant.ROUTER_NAME.HOME,
    component: Home
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
