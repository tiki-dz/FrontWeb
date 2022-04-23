<script scope>
import categoryService from "../services/categoryService";
export default {
  name: "ItemView",
  data() {
    return {
      categories: [],

    };
  },

  methods: {
    async getCategories() {
      let response = await categoryService.getCategories();
      this.categories = response.data.data.category;
      console.log(this.categories);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
  created() {
    this.getCategories();
  },
  async deleteCtegory(idCategory) {
      try {
        let response = await categoryService.deleteCategory(idCategory);
        console.log(response.data);
        ElNotification({
          title: "supprimer avec succees",
          message: "categorie supprimer ",
          type: "success",
        });
      } catch (error) {
        ElNotification({
          title: "impossible de supprimer",
          message: "Erreur ",
          type: "error",
        });
      }
    },
  
};
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>Categories</span>
        <router-link to="/home/AddCategory">
          <span id="add">Ajouter</span>
        </router-link>
      </div>
    </template>
    <el-row v-for="categorie in categories" :key="categorie">
      <el-card id="cardlist">
        <el-row
          ><el-col :span="12"> idCategory</el-col>
          <el-col :span="12">{{ categorie.idCategory }}</el-col>
        </el-row>

        <el-divider />
        <el-row
          ><el-col :span="12"> Nom</el-col>
          <el-col :span="12">{{ categorie.name }}</el-col>
        </el-row>

        <el-divider />
        <el-row
          ><el-col :span="12"> Description</el-col>
          <el-col :span="12">{{ categorie.description }}</el-col>
        </el-row>
        <el-divider />

        <el-row
          ><el-col :span="12"> icon</el-col>
          <el-col :span="12">{{ categorie.icon }}</el-col>
        </el-row>
        <el-divider/>
        <el-row>
          <el-col :span="16"></el-col>
<el-col :span="4">
   <router-link to="/home/SubList">   <el-button type="primary" plain >Détaills</el-button>
</router-link>

          </el-col>
          <el-col :span="4">

    <el-button type="danger" plain @click="deleteCtegory(categorie.idCategory)">supprimer</el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-row>

    <br />
    <br />
  </el-card>
</template>

<style scoped>
#add {
  margin-left: 80%;
  color: #fd7d1bdc;
}
#cardlist {
  margin-top: 5%;
  width: 100%;
}
</style>
