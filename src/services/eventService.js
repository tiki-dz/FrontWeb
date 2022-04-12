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

//     var param= new URLSearchParams();
// param.append('page', '1');
// param.append('size', '10');
//     return Api().get("/admin/event", credantials , {
//         params: param 
//   })
 return Api().get("/admin/event?page="+credantials+"&size=10", credantials )
},
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
