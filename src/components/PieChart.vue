<template>
  <div id="Pie">

    <el-card style="width:40%; padding:1%">
      <div>
        <Doughnut
          :chart-options="wilayaOptions"
          :chart-data="wilayaData"
          :height="400"
        />
      </div>
    </el-card>
  </div>
</template>
<script>
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  components: { Doughnut },
  data() {
    return {
      wilayaData: {
        labels: ["adrar","chlef","","Sba","","","","","","","","","","","","","","","","","","","","","","","","","",""],
        datasets: [
          {
            borderColor: "#fff",
            fill: true,
            label: "purchases",
            data: [43, 200, 180, 20, 230,143, 20, 320, 1820, 210,743, 100, 800, 1820, 2900,1743, 2000, 1800, 1820, 2300,1743, 2000, 1800, 1820, 2300,1743, 2000, 1800, 1820, 2300],
            backgroundColor: ['#B96C31', '#EE6651', '#E69CBE', '#A686AC','#6A8EAE',"#619B91","#F5A753","#B09B81"],
          }],
      },
      wilayaOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          
          x: {
             grid: {
              display: false,},
            ticks: {
              beginAtZero: true,
              fontFamily: "'Open Sans Bold', sans-serif",
              fontSize: 11,
            },
            scaleLabel: {
              display: true,
              labelString: "probability",
            },
          },
          y: {
            grid: {
              display: false,
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
              text: "pourcentage de clients",
            },
          },
        },
      },
    };
  },
};
</script>
<style scoped>

#Pie .el-card {
  margin: 1%;
  border-radius: 20px;
}
</style>
