/* eslint-disable prettier/prettier */
import Api from "@/services/api";
export default {
  Add(credantials) {
    return Api().post("/admin/event", credantials , {
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser"),
        'Content-Type': 'multipart/form-data'}
  })},
  getCategories(credantials) {
    return Api().get("/admin/category", credantials , {
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser")},
      params: { page: 1 , size: 10} 
  })},
  getSubCategories(credantials) {
    console.log(credantials)
    let id=credantials
    return Api().get("/admin/Category/"+id+"/subCategory/" , {
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser")}
  })},
  
}
