<script scope>
import categoryService from "../services/categoryService";
import { ElNotification } from "element-plus";

export default {
  name: "ItemView",
  data() {
    return {
      categories: [],
      pages: 1,
      pageSize: 12,
    };
  },

  methods: {
    route(id) {
      this.$router.push("/home/subList/" + id);
    },
    async deleteCtegory(idCategory) {
      try {
        let response = await categoryService.deleteCat(idCategory);
        console.log(response.data.data);
        ElNotification({
          title: "supprimer avec succees",
          message: "categorie supprimer ",
          type: "success",
        });
        location.reload();
      } catch (error) {
        ElNotification({
          title: "impossible de supprimer",
          message: "Erreur ",
          type: "error",
        });
      }
    },

    async getCategories(pageNumber) {
      let response = await categoryService.getCategories({
        page: pageNumber,
        size: this.pageSize,
      });
      this.categories = response.data.data.category;
      this.pages = response.data.data.totalPages * 12;
      console.log(this.pages);
      //console.log(this.categories);
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    addCategory() {
      this.$router.push("/home/AddCategory");
    },
  },
  created() {
    this.getCategories();
  },
};
</script>

<template>
  <nav class="categories">
    <!-- nav bar  -->
    <el-row style="margin-bottom: 10px; margin-top: 10px">
      <!-- total columns is 24 -->
      <el-col :span="24">
        <el-card class="header">
          <div class="card card-frame col-4">
            <div class="card-body">
              <el-row>
                <el-col :span="6" class="path">
                  <el-breadcrumb separator="/">
                    <el-breadcrumb-item
                      style="color: aliceblue"
                      :to="{ path: '/home/CategoryList' }"
                      >Catégories</el-breadcrumb-item
                    >
                  </el-breadcrumb>
                </el-col>
                <el-col :span="12">
                  <el-input
                    v-model="search"
                    placeholder="Chercher un id,nom ou utilisateur"
                  >
                    <template #prefix>
                      <el-icon class="el-input__icon"
                        ><i class="fa fa-search"></i
                      ></el-icon>
                    </template>
                  </el-input>
                </el-col>
                <el-col :span="4">
                  <button
                    style="width: 100%"
                    type="button"
                    id="add"
                    @click="addCategory()"
                  >
                    Ajouter catégorie
                  </button></el-col
                >
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-scrollbar max-height="80vh">
          <h1>Catégories</h1>
          <br />
          <el-card style="margin: 1%">
            <template #header>
              <div class="card-header">
                <el-row>
                  <el-col :span="1" id="nom"> Id</el-col>
                  <el-col :span="4" id="nom"> Nom</el-col>
                  <el-col :span="7" id="nom"> Description</el-col>
                  <el-col :span="5" id="nom"> Icon</el-col>
                  <el-col :span="5" id="nom"> Action</el-col>
                </el-row>
              </div>
            </template>

            <el-row v-for="categorie in categories" :key="categorie">
              <el-col :span="1">{{ categorie.idCategory }}</el-col>
              <el-col :span="4">{{ categorie.name }}</el-col>
              <el-col :span="7">{{ categorie.description }}</el-col>
              <el-col :span="5">{{ categorie.icon }}</el-col>
              <el-col :span="2">
                <el-button
                  type="primary"
                  plain
                  @click="route(categorie.idCategory)"
                  >Détaills</el-button
                >
              </el-col>

              <el-col :span="3">
                <el-button
                  type="danger"
                  plain
                  @click="deleteCtegory(categorie.idCategory)"
                  >supprimer</el-button
                >
              </el-col>

              <el-divider border-style="double" />
            </el-row>

            <br />
            <br />
          </el-card>
        </el-scrollbar>
        <!-- body cards  -->
      </el-col>
    </el-row>
  </nav>
</template>
<style scoped>
#add {
  color: #fd7d1bdc;
  cursor: pointer;
  box-shadow: 0px 0px 3px rgb(154, 154, 154);
}
#cardlist {
  width: 100%;
}
#nom {
  color: #fd7d1bdc;
}
.categories .el-col {
  text-align: center;
}
</style>
