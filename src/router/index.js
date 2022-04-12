import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeAdmin.vue";
import LoginView from "../views/LoginView.vue";
import NotFound from "../views/NotFound.vue";
import EventDetail from "../components/EventDetail.vue";
import EventList from "../components/EventList.vue";
import Category from "../components/CategoryList.vue";
import AddCategory from "../components/AddCategory.vue";
import AddAdmin from "../components/AddAdmin.vue";
import AddPartner from "../components/AddPartner.vue";

import Dashboard from "../components/DashBoard.vue";

function CheckLogin(to, from, next) {
  var isAuthenticated = false;
  if (localStorage.getItem("LoggedUser")) isAuthenticated = true;
  else isAuthenticated = false;
  console.log("auth: " + isAuthenticated);
  console.log("to name: " + (to.name == "login"));
  if (isAuthenticated && to.name !== "login") {
    next();
  } else if (to.name == "login" && !isAuthenticated) {
    next();
  } else if (isAuthenticated) {
    next("/");
  } else next("/login");
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
      children: [
        { path: "Event", name: "event", component: EventDetail },
        { path: "EventList", component: EventList },
        { path: "AddCategory", component: AddCategory },
        { path: "AddPartner", component: AddPartner },
        { path: "AddAdmin", component: AddAdmin },
        { path: "Category", component: Category },
        { path: "EventList", component: EventList },
        { path: "", component: Dashboard },
      ],
      beforeEnter: CheckLogin,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      beforeEnter: CheckLogin,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: NotFound,
    },
  ],
});

export default router;
