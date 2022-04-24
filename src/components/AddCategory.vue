<template>
  <!-- header -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
         <router-link to="/home/CategoryList">

        <span id="preced">precedente</span>
                        </router-link>
        <span>Ajouter categorie</span>
      </div>
    </template>

    <!-- Form -->

    <el-form :model="form" id="app"  method="post" >
     
      <el-form-item label="name" :label-width="formLabelWidth" prop="nom"
       
      >
        <el-input v-model="form.name" autocomplete="off" id="name" />
         <p v-if="form.errors.length" style="font-size: 10px;margin-left:20%;
color: red;">
   Donnez un nom a votre categorie
    <ul>
      <li v-for="error in errors"
      :key="error">{{ error }}</li>
    </ul>
  </p>
      </el-form-item>
      <el-form-item label="description" :label-width="formLabelWidth" prop="description">
        <el-input v-model="form.description" autocomplete="off" id="description"/>
      </el-form-item>
      <el-form-item label="icon" :label-width="formLabelWidth">
        <el-input v-model="form.icon" autocomplete="off" />
       
      </el-form-item>
     
            <el-button style="margin-right:1%" @click="reset">reset</el-button>

     
      <el-button
        type="primary"
        @click="checkForm"
        color="#fd7d1bdc"
        style="color: white"
        >Ajouter</el-button
      >
    </el-form>
  </el-card>
</template>

<script >
import { ref } from "vue";
import { ElNotification } from 'element-plus';
import categoryService from "../services/categoryService";
// dialogFormVisible = ref(false);
//const formLabelWidth = "140px";
export default {

  name: "AddCategorie",
  data() {
    return {
      form: {
        
        name: "",
        description: "",
        icon: "",
        errors:[],
      },
      formLabelWidth: "140px",

      search: ref(""),

    };
  },
  methods: {
   function() {   
   ('.icon-picker').iconpicker();
 },
   
    
 AddCategory() {
      try{  const response = categoryService.AddCategory({
        
        name: this.form.name,
        description: this.form.description,
        icon: this.form.icon,
      });
              
ElNotification({
          title: "Ajouter  avec succees",
          message: "categorie ajouter ",
          type: "success",
        });
      console.log(response.data);
      }catch(error) {
        console.log(error);
      }
    
    },
     checkForm() {
      this.form.errors = [];
      if(this.form.name === '') {
        this.form.errors.push(" nom de categorie est obligatoire.");
        
      } else{
      this.AddCategory();
    

      }
    },
    
      reset(){
        this.form.name = '';
        this.form.description = '';
                this.form.icon = '';



      },
    
  },
};
</script>

<style scoped>

.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
#preced{
 
  margin-right: 80%;
  color: #fd7d1bdc;

}

</style>
