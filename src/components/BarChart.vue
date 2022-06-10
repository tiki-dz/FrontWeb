<template>
  <div id="stats">
    <el-card style="max-width: 23%">
      <div>
        <Bar
          :chart-options="typeOptions"
          :chart-data="genderData"
          :height="500"
        />
      </div>
    </el-card>
    <el-card style="max-width: 23%">
      <div>
        <Bar
          :chart-options="typeOptions"
          :chart-data="activeData"
          :height="500"
        />
      </div>
    </el-card>
    <el-card>
      <div>
        <Bar
          :chart-options="typeOptions"
          :chart-data="typeData"
          :height="500"
        />
      </div>
    </el-card>
    <el-card style="max-width: 23%">
      <div>
        <Bar
          :chart-options="genderOptions"
          :chart-data="genderData"
          :height="500"
        />
      </div>
    </el-card>
  </div>
</template>
<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);
export default {
  components: { Bar },
  data() {
    return {
      genderData: {
        labels: [""],
        datasets: [
          {
            label: "femmes",
            data: [1743],
            backgroundColor: " rgba(63,103,126,1)",
          },
          { label: "hommes", data: [3094] },
        ],
      },
      activeData: {
        labels: [""],
        datasets: [
          {
            label: "activé",
            data: [1743],
            backgroundColor: "#EA8C3C",
          },
          { label: "désactivé", data: [3094] },
        ],
      },
      typeOptions: {
        responsive: true,
        scales: {
          x: {
            ticks: {
              beginAtZero: true,
              fontFamily: "'Open Sans Bold', sans-serif",
              fontSize: 11,
            },
          },
          y: {
            ticks: {
              fontFamily: "'Open Sans Bold', sans-serif",
              fontSize: 11,
              // // Include a dollar sign in the ticks
              //   callback: function(value) {
              //       return '' + value;
              //   }
            },
            title: {
              display: true,
              text: "Nombre de clients",
            },
          },
        },
      },

      typeData: {
        labels: [""],
        datasets: [
          {
            label: "clients",
            data: [20743],
            backgroundColor: "#B96C31",
          },
          { label: "partenaires", data: [994] },
        ],
      },
    };
  },
};
</script>
<style scoped>
#stats {
  display: flex;
  justify-content: space-around;
}
#stats .el-card {
  margin: 1%;
  width: 30%;
  border-radius: 20px;
}
</style>
