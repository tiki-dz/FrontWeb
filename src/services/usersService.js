/* eslint-disable prettier/prettier */
import Api from "@/services/api";

export default {
  AllUsers(credantials) {
    let page = credantials.page;
    let size = credantials.size;
    let search = credantials.search;
    let filter = credantials.filter;
    return Api().get(
      "/admin/accounts?page=" +
        page +
        "&size=" +
        size +
        "&search=" +
        search +
        "&filter=" +
        filter,
      {
        headers: {
          "x-access-token": localStorage.getItem("LoggedUser"),
        },
      }
    );
  },
  sendNotifToOneUser(credantials) {
    return Api().post("/admin/notification", credantials, {
      headers: {
        "x-access-token": localStorage.getItem("LoggedUser"),
      },
    });
  },
  sendNotifToAll(credantials) {
    return Api().post("/admin/notificationAll", credantials, {
      headers: {
        "x-access-token": localStorage.getItem("LoggedUser"),
      },
    });
  },
  toogleAccount(credantials) {
    let email = credantials.email;
    let state = credantials.state;
    let link =
      credantials.state == false
        ? "admin/client/activate"
        : "admin/client/deactivate";
    credantials.state = credantials.state == false ? 1 : 2;
    return Api().put(link, credantials, {
      headers: {
        "x-access-token": localStorage.getItem("LoggedUser"),
      },
    });
  },
};