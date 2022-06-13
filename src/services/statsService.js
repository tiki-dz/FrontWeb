/* eslint-disable prettier/prettier */
import Api from "@/services/api";

export default {
 userStats() {
  console.log("userstatss")
  return Api().get("/statistic/users",{
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser")}
  })
},
cityStats() {
  console.log("userstatss")
  return Api().get("/statistic/cities",{
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser")}
  })
},
purchaseStats() {
  console.log("userstatss")
  return Api().get("/statistic/Purchases",{
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser")}
  })
}
}