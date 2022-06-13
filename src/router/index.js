import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeAdmin.vue";
import LoginView from "../views/LoginView.vue";
import NotFound from "../views/NotFound.vue";
import EventDetail from "../components/EventDetail.vue";
import EventList from "../components/EventList.vue";
import CategoryList from "../components/CategoryList.vue";
import AddCategory from "../components/AddCategory.vue";
import AddAdmin from "../components/AddAdmin.vue";
import AddEvent from "../components/AddEvent.vue";
import AddPartner from "../components/AddPartner.vue";
import subCategory from "../components/subCategory.vue";
import SubList from "../components/SubList.vue";

import Dashboard from "../components/DashBoard.vue";
import UsersList from "../components/UsersList.vue"
import AddCodePromo from "../components/AddCodePromo.vue";
import CodesPromo from "../components/CodesPromo.vue";
import PurshasesList from "../components/Purshases.vue"
import  SendNotification  from "../components/SendNotification.vue";
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
    next("/home");
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
        { path: "Users", component: UsersList },
        { path: "Event", name: "event", component: EventDetail },
        { path: "EventList", component: EventList },
        { path: "AddCategory", component: AddCategory },
        { path: "AddPartner", component: AddPartner },
        { path: "AddAdmin", component: AddAdmin },
        { path: "AddEvent", component: AddEvent },
        { path: "CategoryList", component: CategoryList },
        { path: "EventList", component: EventList },
        { path: "notification", component: SendNotification },
        { path: "subCategory", name: "subCategory", component: subCategory },
        { path: "SubList/:idCategory", component: SubList },

        { path: "Purshases", component: PurshasesList },

        { path: "AddCodePromo", component: AddCodePromo },
        { path: "CodePromoList", component: CodesPromo },
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
    {
      path: "/",
      redirect: "/home",
    },
  ],
});

export default router;
