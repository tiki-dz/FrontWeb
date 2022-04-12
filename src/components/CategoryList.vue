<script scope>
import categoryService from "../services/categoryService";
export default {
  name: "ItemView",
  data() {
    return {
      categories:[
      ],
    };
  },

  methods: {
    async getCategories() {
      let response = await categoryService.getCategories();
       this.categories = response.data.data.category;
       console.log( this.categories);
     
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
  created(){
    this.getCategories();
  }
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
    <!--
    <el-table :data="categories" style="width: 100%">
      <el-table-column label="idCategory" width="180" v-model="categories">
        <template #default="">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px"></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Nom" width="180" v-model="categories">
        <template #default="">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px"></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="description" width="180" >
        <template #default="">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px"></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="icon" width="180" >
        <template #default="">
          <div style="display: flex; align-items: center">
            <span style="margin-left: 10px"></span>
          </div>
        </template>
      </el-table-column>
       <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
   
    
    </el-table>
    -->
    <el-row v-for="categorie in categories"
      :key="categorie">
      <el-card  id="cardlist"
   
   
>
<el-row><el-col :span="12"> idCategory</el-col> <el-col :span="12">{{categorie.idCategory }}</el-col>  
</el-row>

 <el-divider />
<el-row><el-col :span="12"> Nom</el-col> <el-col :span="12">{{ categorie.name }}</el-col>  
</el-row>

 <el-divider />
<el-row><el-col :span="12"> Description</el-col> <el-col :span="12">{{ categorie.description }}</el-col>  
</el-row>
 <el-divider />

<el-row><el-col :span="12"> icon</el-col> <el-col :span="12">{{ categorie.icon }}</el-col>  
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
#cardlist{
  margin-top: 5%;
  width: 100%;
}
</style>
