/* eslint-disable prettier/prettier */
import Api from "@/services/api";
export default {
  Login(credantials) {
    return Api().post("/admin/login", credantials);
  }
};