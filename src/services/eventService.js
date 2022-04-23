/* eslint-disable prettier/prettier */
import Api from "@/services/api";
export default {
  Add(credantials) {
    return Api().post("/admin/event", credantials , {
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser"),
        'Content-Type': 'multipart/form-data'}
  })},
  AllEvents(credantials) {
    let page= credantials.page
    let size= credantials.size
  return Api().get("/admin/event?page="+page+"&size="+size, credantials )
  },
  Update(credantials) {
    let id=credantials.id;
    let form=credantials.form
    return Api().patch("/admin/event/"+id, form , {
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser"),
        'Content-Type': 'multipart/form-data'}
  })}, 
  Delete(credantials) {
    let id=credantials;
    return Api().delete("/admin/event/"+id, {
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser"),
    }  })},  
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
  addSubCategorie(credantials) {
    console.log(credantials)
    let idEvent=credantials.id
    return Api().post("/admin/event/"+idEvent+"/subcategory" ,credantials.data, {
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser")}
  })},
  deleteSubCategorie(credantials) {
    console.log(credantials)
    let idEvent=credantials.id
    return Api().delete("/admin/event/"+idEvent+"/subcategory" ,credantials.data, {
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser")}
  })},
  addtag(credantials) {
    console.log(credantials)
    let idEvent=credantials.id
    return Api().post("/admin/event/"+idEvent+"/tag" ,credantials.data, {
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser")}
  })},
  deleteTag(credantials) {
    console.log(credantials)
    let idEvent=credantials.id
    return Api().delete("/admin/event/"+idEvent+"/tag" ,credantials.data, {
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser")}
  })},
  updateImage(credantials) {
    console.log(credantials)
    let idEvent=credantials.id
    return Api().put("/admin/event/"+idEvent+"/updateImage" ,credantials.data, {
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser")}
  })},
  
  
}
