<template>
  <el-scrollbar max-height="100vh">
    <h1
      style="font-size: 38px; padding-top: 10px; padding-left: 20%; float: left"
    >
      Acceuil
    </h1>
    <br />
    <button id="add" @click="update()">Rafraichir</button>
    <br />
    <div>
      <BarChart style="clear: both"></BarChart>
      <div style="display: block">
        <line-chart-purchase></line-chart-purchase>
      </div>

      <pie-chart></pie-chart>
    </div>
  </el-scrollbar>
</template>
<style scoped>
#add {
  padding: 15px;
  font-size: 15px;
  border: none;
  border-radius: 5px;
  font-weight: bolder;
  cursor: pointer;
  margin-right: 4%;
  float: right;
  color: white;
  background: #fd7d1bdc;
  box-shadow: 0px 0px 3px rgb(154, 154, 154);
}
</style>
<script>
import statsService from "../services/statsService";
import { ElNotification } from "element-plus";
import "element-plus/es/components/loading/style/css";

import "element-plus/es/components/loading/style/css";
import { ElLoading } from "element-plus";
export default {
  methods: {
    async update() {
      console.log("updating");
      let loading;
      try {
        loading = ElLoading.service({
          lock: true,
          text: "Chargement",
          background: "rgba(0, 0, 0, 0.7)",
        });
        await statsService.updateUserStats();
        await statsService.updateCitiesStats();
        await statsService.updatePurchaseStats();
          loading.close();
          location.reload()
        ElNotification({
          title: "Succées",
          message: "Mise à jour terminé",
          type: "success",
        });

      } catch (error) {
        console.log(error);
        loading.close();
      }
    },
  },
};
</script>
