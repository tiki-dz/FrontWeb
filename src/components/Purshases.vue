<script scope>
import purshasesList from "../services/purshasesService";
import "element-plus/es/components/loading/style/css";
import { ElLoading } from "element-plus";
export default {
  name: "PurshasesList",
  data() {
    return {
      currentPage: 1,
      Allpur: [],
      pages: 1,
      pageSize: 14,
      totalPages: 1,
      totalItems: 0,
      filter: "",
      search: "",
      value1: true,
      value2: false,
    };
  },
  mounted: function () {
    this.handleCurrentChange(1);
  },
  methods: {
    async handleCurrentChange(pageNumber) {
      const loading = ElLoading.service({
        lock: true,
        text: "Chargement",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let purchases = await purshasesList.Allpurshases();
      console.log('pppppppppp',purchases);
      this.Allpur = purchases.data.data.achats;
      console.log('pppppppppp',this.Allpur);
      loading.close()
    },
  },
};
</script>
<template>
  <div>
    <el-row style="margin-bottom: 10px; margin-top: 10px">
      <!-- total columns is 24 -->
      <el-col :span="24">
        <el-card class="header">
          <div class="card card-frame col-4">
            <div class="card-body">
              <el-row>
                <el-col :span="6" class="path"> 
                  <el-breadcrumb separator="/">
                    <el-breadcrumb-item style="color: aliceblue"
                      >Achats</el-breadcrumb-item
                    >
                  </el-breadcrumb>
                </el-col>
                <el-col :span="12">
                  <el-input
                    v-model="search"
                    placeholder="Chercher un email de l'utilisateur"
                  >
                    <template #prefix>
                      <el-icon class="el-input__icon"
                        ><i class="fa fa-search"></i
                      ></el-icon>
                    </template>
                  </el-input>
                </el-col>
                <el-col :span="4">
                  <button type="button" id="add" @click="searchUser()">
                    Search for a purshase
                  </button></el-col
                >
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <br />
    <br />
    <el-table :data="Allpur" style="width: 100%; padding-left: 20px">
      <el-table-column
        sortable
        prop="idPurchase"
        label="#"
        width="100px"
      ></el-table-column>
      <el-table-column
        sortable
        prop="idClient"
        label="idClient"
        width="270px"
      ></el-table-column>
      <el-table-column
        sortable
        prop="idEvent"
        label="idEvent"
        width="270px"
      ></el-table-column>
      <el-table-column
        sortable
        prop="createdAt"
        label="date"
        width="270px"
      ></el-table-column>
      <el-table-column
        sortable
        prop="Nombre de tickets"
        label="Nombre de tickets"
        width="270px"
      >
        <template #default="scope">
          <p>{{ scope.row.MultipleTickets.length + 1 }}</p>
        </template>
      </el-table-column>
    </el-table>
    <br />
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="14"
      background
      layout="prev, pager, next"
      :total="totalItems"
    />
  </div>
</template>
<style>
.el-input__prefix {
  height: 80%;
}
</style>
