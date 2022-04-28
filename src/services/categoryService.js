import Api from "@/services/api";
export default {
  AddCategory(credantials) {

    return Api().post("/admin/category", credantials, {
      headers: {
        "x-access-token": localStorage.getItem("LoggedUser"),
      },
    });
  },
  deleteCat(credantials) {
    let id = credantials;

    return Api().delete("admin/category/" + id,  {
      headers: {
        "x-access-token": localStorage.getItem("LoggedUser"),
      },
    });
  },
  getCategories(credantials) {
    let page = credantials.page;
    let size = credantials.size;
    return Api().get(
      "/admin/category?page=" + page + "&size=" + size,
      credantials,
      {
        headers: {
          "x-access-token": localStorage.getItem("LoggedUser"),
        },
      }
    );
  },
  UpdateCategorie(credantials) {
    let id = credantials.id;
    let form = credantials.form;
    return Api().patch("/admin/category/" + id, form, {
      headers: {
        "x-access-token": localStorage.getItem("LoggedUser"),
        "Content-Type": "multipart/form-data",
      },
    });
  },
  /////////////////////////////////////////SOUS CATEGORIES////////////////////////////////////////////

  getSubCategories(credantials) {
    console.log(credantials);
    let id = credantials;
    return Api().get("/admin/Category/" + id + "/subCategory/", {
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
  /*
 DeleteSubCat(credantials) {
    let id = credantials;
    console.log("supressioon");
    return Api().delete("admin/subCategory/" + id, {
      headers: {
        "x-access-token": localStorage.getItem("LoggedUser"),
      },
    });
  },
  */
  DeleteSubCat(credantials) {
    let id = credantials;

    return Api().delete("admin/subCategory/"+id,  {
      headers: {
        "x-access-token": localStorage.getItem("LoggedUser"),
      },
    });
  },
  UpdateSousCategorie(credantials) {
    let id = credantials.id; 
    let form = credantials.form;
    return Api().patch("/admin/subCategory/" + id, form, {
      headers: {
        "x-access-token": localStorage.getItem("LoggedUser"),
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
