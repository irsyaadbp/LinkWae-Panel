/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import LocalMallIcon from "@material-ui/icons/LocalMall";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";

import InfoList from "views/TableList/InfoList.js";
import PromoList from "views/TableList/PromoList.js";
import TransactionList from "views/TableList/TransactionList.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    // rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/promo",
    name: "Promo",
    // rtlName: "ملف تعريفي للمستخدم",
    icon: LocalMallIcon,
    component: PromoList,
    layout: "/admin"
  },
  {
    path: "/information",
    name: "Information",
    // rtlName: "قائمة الجدول",
    icon: "info",
    component: InfoList,
    layout: "/admin"
  },
  {
    path: "/transaction",
    name: "Transaction",
    // rtlName: "طباعة",
    icon: LibraryBooks,
    component: TransactionList,
    layout: "/admin"
  }
];

export default dashboardRoutes;
