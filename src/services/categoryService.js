import Api from "@/services/api";
export default {
  AddCategory(credantials) {
    return Api().post("/admin/category", credantials, {
      headers: {
        "x-access-token": localStorage.getItem("LoggedUser"),
      },
    });
  },
  deletCategory(credantials) {
    return Api().del("/admin/category/{idCategory}", credantials, {
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
  SubCategories(credantials) {
    return Api().post("/admin/subCategory", credantials, {
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
