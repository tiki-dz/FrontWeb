<template>
  <div id="stats">
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
          :chart-options="sexeOptions"
          :chart-data="genderData"
          :height="500"
        />
      </div>
    </el-card>
    <el-card style="max-width: 23%">
      <div>
        <Bar
          :chart-options="activClientOptions"
          :chart-data="activeData"
          :height="500"
        />
      </div>
    </el-card>
    
    <el-card style="max-width: 23%">
      <div>
        <Bar
          :chart-options="activPartnerOptions"
          :chart-data="partnerData"
          :height="500"
        />
      </div>
    </el-card>
  </div>
</template>
<script>
import { Bar } from "vue-chartjs";
import statsService from "../services/statsService";

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
  props: {
    stats: JSON,
  },
  components: { Bar },
  data() {
    return {
      // gender 
      genderData: {
        labels: [""],
        datasets: [
          {
            label: "femmes",
            data: [1111],
            backgroundColor: " rgba(63,103,126,1)",
          },
          { label: "hommes", data: [3094] },
        ],
      },
       sexeOptions: {
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Clients par Sexe",
          },
        },
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
      // active clients
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
      activClientOptions: {
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Etat des clients",
          },
        },
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
     //type

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
      typeOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Type d'utilisateur",
          },
        },
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
              text: "Nombre des utilisateurs",
            },
          },
        },
      },
// atat partenaire
 activPartnerOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          title: {
            display: true,
            text: "Etat des partenaires",
          },
        },
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
              text: "nombre des partenaires",
            },
          },
        },
      },
      partnerData: {
        labels: [""],
        datasets: [
          {
            label: "activé",
            data: [20743],
            backgroundColor: "#B96C31",
          },
          { label: "désactivé", data: [994] },
        ],
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

      let response = await statsService.userStats();
      loading.close();
      this.val = response.data.data[response.data.data.length-1];
      this.genderData.datasets[1].data=[this.val.manClient];
      this.genderData.datasets[0].data=[this.val.womenClient];
      this.activeData.datasets[0].data=[this.val.activatedClient];
      this.activeData.datasets[1].data=[this.val.deactivatedClient];
      this.typeData.datasets[1].data=[this.val.totalPartner];
      this.typeData.datasets[0].data=[this.val.totalClient];
      this.partnerData.datasets[0].data=[this.val.activatedPartner];
      this.partnerData.datasets[1].data=[this.val.deactivatedPartner];

    },
  },
  created() {
    console.log("child", this.stats);
    this.handleCurrentChange();
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
