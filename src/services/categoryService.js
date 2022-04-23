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
    let id=credantials;
    return Api().delete("/admin/category/"+id, {
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser"),
    }  })},  
  getCategories(credantials) {
    return Api().get("/admin/category", credantials, {
      headers: {
        "x-access-token": localStorage.getItem("LoggedUser"),
      },
    });
  },
  getSubCategories(credantials) {
    console.log(credantials)
    let id=credantials;
    return Api().get("/admin/subCategory/"+id , {
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser")}
  })},
  AddSubCategories(credantials) {
    console.log(credantials)
    let id=credantials
    return Api().post("/admin/Category/"+id+"/subCategory/" , {
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser")}
  })},
  
};
