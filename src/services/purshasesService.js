/* eslint-disable prettier/prettier */
import Api from "@/services/api";

export default {
 Allpurshases(page) {

  return Api().get("/payment/purchases?page="+ page,{
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser")}
  })
  },
}