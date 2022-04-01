import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeAdmin.vue";
import LoginView from "../views/LoginView.vue";
function CheckLogin(to, from, next) {
  var isAuthenticated = false;
  if (localStorage.getItem("LoggedUser")) isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated && to.name !== "login") {
    next();
  } else if (!isAuthenticated) {
    next("/login");
  } else {
    next("/");
  }
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
  ],
});

export default router;
