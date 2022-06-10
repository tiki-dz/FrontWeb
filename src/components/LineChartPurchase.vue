<template>
  <div id="Line">

    <el-card>
      <div>
        <Line
          :chart-options="purchaseOptions"
          :chart-data="purchaseData"
          :height="200"
        />
      </div>
    </el-card>
  </div>
</template>
<script>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);
export default {
  components: { Line },
  data() {
    return {
      purchaseData: {
        labels: ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
        datasets: [
          {
            borderColor: "rgba(63,103,126,1)",
            fill: true,
            borderRadius: 100,
            label: "Achats",
            data: [1743, 2000, 1800, 1820, 2300,1743, 2000, 3200, 1820, 2300,1743, 2000, 1800, 1820, 2900,1743, 2000, 1800, 1820, 2300,1743, 2000, 1800, 1820, 2300,1743, 2000, 1800, 1820, 2300],
            backgroundColor: "rgba(63,103,126,1)",
          }    ],
      },
      purchaseOptions: {
        responsive: true,
        plugins: {
      legend: {
        position: 'top',
      },
       title: {
        display: true,
        text: 'Chart.js Bar Chart'
      }},
        maintainAspectRatio: false,
        scales: {
          
          x: {
            ticks: {
              beginAtZero: true,
              fontFamily: "'Open Sans Bold', sans-serif",
              fontSize: 11,
            },

          },
          y: {
            gridLines: {
              display: false,
              color: "#fff",
              zeroLineColor: "#fff",
              zeroLineWidth: 0,
            },
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
              text: "Total achats",
            },
          },
        },
      },
    };
  },
};
</script>
<style scoped>

#Line .el-card {
  margin: 1%;
  border-radius: 20px;
  width: 55%;
  float: left;
}
</style>
