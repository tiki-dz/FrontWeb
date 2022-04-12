import Api from "@/services/api";
export default {
  AddCategory(credantials) {
    return Api().post("/admin/category", credantials, {
      headers: {
        "x-access-token": localStorage.getItem("LoggedUser"),
      },
    });
  },
  getCategories(credantials) {
    return Api().get("/admin/category", credantials, {
      headers: {
        "x-access-token": localStorage.getItem("LoggedUser"),
      },
    });
  },
  AddSubCategory(credantials) {
    return Api().post("/admin/subCategory", credantials, {
      headers: {
        "x-access-token": localStorage.getItem("LoggedUser"),
      },
    });
  },
};
