import Api from "@/services/api";
export default {
  CreateCodePromo(credantials) {
    return Api().post("/admin/codepromo", credantials);
  },
  AllCodes(credantials) {
    let page= credantials.page
    let size= credantials.size
    let search = credantials.search
  return Api().get("/admin/codepromo?page="+page+"&size="+size+"&search="+search,{
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser")}
  } )
  },
  deleteCodePromo(id) {
     return Api().delete("/admin/codepromo/"+ id,{
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser")}
  } )
  }
  
}