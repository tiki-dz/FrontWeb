<script scope>
import codesService from "../services/codeService";
import "element-plus/es/components/loading/style/css";
import { ElLoading } from "element-plus";
import { ElNotification } from "element-plus/es";

export default {
  name: "CodesPromo",
  data() {
    return {
      currentPage: 1,
      Allcodes: [],
      pages: 1,
      pageSize: 3,
      totalPages: 1,
      totalItems: 0,
      search: "",
      codeFilter: "",
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
      let codes = await codesService.AllCodes({
        page: pageNumber - 1 <= 0 ? 0 : pageNumber - 1,
        size: "3",
        search: this.search,
      });
      console.log(this.codes + "éé");
      this.Allcodes = codes.data.data.codes;
      console.log("wow", this.Allcodes);
      this.totalPages = codes.data.totalPages;
      this.totalItems = codes.data.data.totalItems;
      loading.close();
    },
    async searchCode() {
      console.log("wow");
      this.currentPage = 1;
      let codes = await codesService.AllCodes({
        page: 0,
        size: "3",
        search: this.search,
      });
      this.Allcodes = codes.data.codes;
      this.totalPages = codes.data.totalPages;
      this.totalItems = codes.data.totalItems;
    },
    async supprimer(id) {
      let codes = await codesService.deleteCodePromo(id);
      var foundIndex = this.Allcodes.findIndex((x) => x.idCodePromo == id);
      this.Allcodes.splice(foundIndex, 1);
      console.log(codes);
      ElNotification({
        title: "Succées",
        message: "Code promo supprimé avec succés",
        type: "success",
      });
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
                      >Promotions</el-breadcrumb-item
                    >
                  </el-breadcrumb>
                </el-col>
                <el-col :span="12">
                  <el-input
                    v-model="search"
                    placeholder="Chercher un code promo"
                  >
                    <template #prefix>
                      <el-icon class="el-input__icon"
                        ><i class="fa fa-search"></i
                      ></el-icon>
                    </template>
                  </el-input>
                </el-col>
                <el-col :span="4">
                  <button type="button" id="add" @click="searchCode()">
                    Rechercher
                  </button></el-col
                >
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row> </el-row>
    <h1>Promotions</h1>

    <el-card style="margin: 20px; border-radius: 20px">
      <el-table :data="Allcodes" style="width: 100%; padding-left: 20px">
        <el-table-column
          sortable
          prop="idCodePromo"
          label="#"
          width="100px"
        ></el-table-column>
        <el-table-column
          sortable
          prop="name"
          label="Nom"
          width="270px"
        ></el-table-column>
        <el-table-column
          sortable
          prop="value"
          label="Valeur"
          width="270px"
        ></el-table-column>
        <el-table-column
          sortable
          prop="startTime"
          label="Date début"
          width="270px"
        ></el-table-column>
        <el-table-column
          sortable
          prop="endTime"
          label="Date fin"
          width="270px"
        ></el-table-column>
        <el-table-column
          sortable
          prop="use"
          label="utilisable"
          width="270px"
        ></el-table-column>
        <el-table-column label="action" width="200px">
          <template #default="scope">
            <el-button type="danger" @click="supprimer(scope.row.idCodePromo)"
              >Supprimer</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <br />
      <el-pagination
        style="margin-left: 36%"
        @current-change="handleCurrentChange"
        :page-size="3"
        background
        layout="prev, pager, next"
        :total="totalItems"
      />
    </el-card>
  </div>
</template>
<style>
.el-input__prefix {
  height: 80%;
}
</style>
