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
  <div id="Line">
    <el-card>
      <div>
        <Line
          :chart-options="incomeOptions"
          :chart-data="incomeData"
          :height="200"
        />
      </div>
    </el-card>
  </div>
</template>
<script>
import { Line } from "vue-chartjs";
import statsService from "../services/statsService";

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
        labels: [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        datasets: [
          {
            borderColor: "rgba(63,103,126,1)",
            fill: true,
            borderRadius: 100,
            label: "Achats",
            data: [
              1743, 2000, 1800, 1820, 2300, 1743, 2000, 3200, 1820, 2300, 1743,
              2000, 1800, 1820, 2900, 1743, 2000, 1800, 1820, 2300, 1743, 2000,
              1800, 1820, 2300, 1743, 2000, 1800, 1820, 2300,
            ],
            backgroundColor: "rgba(63,103,126,1)",
          },
        ],
      },
      incomeData: {
        labels: [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        datasets: [
          {
            borderColor: "#EA8C3C",
            fill: true,
            borderRadius: 100,
            backgroundColor: "#EA8C3C",
            label: "Revenu",
            data: [
              2743, 3500, 1800, 3820, 2340, 1800, 3820, 2340, 2300, 1743, 2000,
              3200, 1820, 2300, 1743, 2743, 3500, 1800, 3820, 2340, 1800, 3820,
              2340, 2300, 1743, 2000, 3200, 1820, 2300, 1743,
            ],
          },
        ],
      },
      incomeOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Revenu total dans le temps",
          },
        },
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
              text: "Total en D.A",
            },
          },
        },
      },
      purchaseOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Nombre des achats dans le temps",
          },
        },
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
              text: "Nombre des achats",
            },
          },
        },
      },
    };
  },
  methods: {
    async handleCurrentChange() {
      const loading = ElLoading.service({
        lock: true,
        text: "Chargement",
        background: "rgba(0, 0, 0, 0.7)",
      });

      let response = await statsService.purchaseStats();
      this.val = response.data.data;
      console.log("length",this.val.length)
      this.incomeData.datasets[0].data=[]
      this.purchaseData.datasets[0].data=[]
      for (let i = this.val.length; i < 30; i++) {
        this.incomeData.datasets[0].data.push(0) ;
        this.purchaseData.datasets[0].data.push(0) ;
      }
      for (let i = 0; i < this.val.length; i++) {
        this.incomeData.datasets[0].data.push(this.val[i].income) ;
        this.purchaseData.datasets[0].data.push(this.val[i].totalPurchase) ;
      }
      

      loading.close();
    },
  },
  created() {
    console.log("child", this.stats);
    this.handleCurrentChange();
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
