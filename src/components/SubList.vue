<script scope>
import categoryService from "../services/categoryService";
export default {
  name: "ItemView",
  data() {
    return {
            subCategories: [],

    };
  },

  methods: {
   
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
 
  async getSubCategories(){
let response = await categoryService.getSubCategories();
      this.subCategories = response.data.subcategory;
      console.log(this.subCategories);

  }
};
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>Sous categories</span>
        <router-link to="/home/subCategory">
          <span id="add">Ajouter</span>
        </router-link>
      </div>
    </template>
    
    <el-row v-for="subCategorie in subCategories" :key="subCategorie">
      <el-card id="cardlist">
        <el-row
          ><el-col :span="12"> idCategory</el-col>
          <el-col :span="12">{{ subCategorie.idCategory }}</el-col>
        </el-row>

        <el-divider />
        <el-row
          ><el-col :span="12"> Nom</el-col>
          <el-col :span="12">{{ subCategorie.name }}</el-col>
        </el-row>

        <el-divider />
        <el-row
          ><el-col :span="12"> Description</el-col>
          <el-col :span="12">{{ subCategorie.description }}</el-col>
        </el-row>
        <el-divider />

        <el-row
          ><el-col :span="12"> icon</el-col>
          <el-col :span="12">{{ subCategorie.icon }}</el-col>
        </el-row>
        <el-divider/>
        <el-row>
          <el-col :span="16"></el-col>
<el-col :span="4">
  
          </el-col>
          <el-col :span="4">

    <el-button type="danger" plain >supprimer</el-button>
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
