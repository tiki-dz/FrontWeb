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
},
updateUserStats() {
  console.log("updating")
  return Api().get("/statistic/update",{
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser")}
  })
},
updateCitiesStats() {
  console.log("updating")
  return Api().get("/autre/cities",{
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser")}
  })
},
updatePurchaseStats() {
  console.log("updating")
  return Api().get("/autre/cities",{
      headers: {
        'x-access-token': localStorage.getItem("LoggedUser")}
  })
}
}