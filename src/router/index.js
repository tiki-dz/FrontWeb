import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeAdmin.vue";
import LoginView from "../views/LoginView.vue";
import NotFound from "../views/NotFound.vue";

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
      path: "/",
      name: "home",
      component: HomeView,
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
