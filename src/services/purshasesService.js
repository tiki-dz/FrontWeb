/* eslint-disable prettier/prettier */
import Api from "@/services/api";

export default {
 Allpurshases() {

  return Api().get("/payment/purchases",{
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser")}
  })
  },
}