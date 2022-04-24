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
    route(id){
      this.$router.push("/home/subList/"+id)
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
    <el-card id="cardlist">
        <el-row>
          <el-col :span="1" id="nom"> id</el-col>
          <el-col :span="4" id="nom"> Nom</el-col>
          <el-col :span="7" id="nom"> Description</el-col>
          <el-col :span="5" id="nom"> icon</el-col>
          <el-col :span="2" id="nom"> Action</el-col>
          <el-col :span="5" id="nom"> </el-col>

          
        </el-row>
    <el-row v-for="categorie in categories" :key="categorie">
      
       

        <el-divider />
        <el-row 
          > <el-col :span="1"  >{{ categorie.idCategory }}</el-col>
          <el-col :span="4" >{{ categorie.name }}</el-col>
          <el-col :span="7">{{ categorie.description }}</el-col>
           <el-col :span="5">{{ categorie.icon }}</el-col>
           <el-col :span="2">
    <el-button type="primary" plain @click="route(categorie.idCategory)">Détaills</el-button>


          </el-col>
            <el-col :span="2">

    <el-button type="primary" plain @click="deleteCtegory(categorie.idCategory)">modifier</el-button>
          </el-col>
          <el-col :span="3">

    <el-button type="danger" plain @click="deleteCtegory(categorie.idCategory)">supprimer</el-button>
          </el-col>
        </el-row>

     
    </el-row>
     </el-card>

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
  width: 100%;
}
#nom{
   color: #fd7d1bdc;
}
</style>
