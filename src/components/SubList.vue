<script scope>
import categoryService from "../services/categoryService";
import { ElNotification } from 'element-plus';

export default {
  name: "ItemView",
  data() {
      
    return {
           url: -1,
            subCategories: [],

    };
  },

  methods: {
       async deleteSousCtegory(idCategory) {
      try {
        let response = await categoryService.deleteSousCat(idCategory);
        console.log(response.data.data);
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
   
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },


    async getSubCategories(idCategory) {
              console.log("aaaaaaaa");

      console.log(idCategory);
      let response = await categoryService.getSubCategories(idCategory);
        this.subCategories = response.data.data.rows;
        console.log(this.subcategories);
     
    },
  },
 created() {
    this.url=this.$route.params.idCategory;
    this.getSubCategories(this.url);
  },
 
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
     <el-card id="cardlist">
           <el-row id="nom"
          ><el-col :span="4" > idCategory</el-col>
          <el-col :span="4"> idSubCategory</el-col>
                    <el-col :span="4"> Nom</el-col>
<el-col :span="6"> Description</el-col>
 <el-col :span="2"> icone</el-col>
<el-col :span="2"> Action</el-col>


        </el-row>
          <el-divider/>
    <el-row v-for="subCategorie in subCategories" :key="subCategorie">
     
        <el-row
          >
          <el-col :span="4">{{ subCategorie.CategoryIdCategory }}</el-col>
          <el-col :span="4">{{ subCategorie.idSubCategory }}</el-col>
           <el-col :span="4">{{ subCategorie.name }}</el-col>
                <el-col :span="6">{{ subCategorie.description }}</el-col>
                                <el-col :span="2">{{ subCategorie.icon }}</el-col>

                  <el-col :span="2"> <el-button type="danger" plain  @click="deleteSousCtegory(subCategorie.idSubCategory)">supprimer</el-button></el-col>   

        </el-row>

     
        <el-divider/>
       
      
      
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
  margin-top: 5%;
  width: 100%;
}
#nom{color: #fd7d1bdc;}
</style>
