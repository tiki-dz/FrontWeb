<template>
  <!-- header -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Ajouter sous categorie categorie</span>
      </div>
    </template>

    <!-- Form -->

    <el-form :model="forms">
      <el-form-item label="idCategory" :label-width="formLabelWidth">
        <el-input v-model="forms.idCategory" autocomplete="off" />
      </el-form-item>
      <el-form-item label="name" :label-width="formLabelWidth">
        <el-input v-model="forms.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="description" :label-width="formLabelWidth">
        <el-input v-model="forms.description" autocomplete="off" />
      </el-form-item>
      <el-form-item label="icon" :label-width="formLabelWidth">
        <el-input v-model="forms.icon" autocomplete="off" />
      </el-form-item>
      <el-button @click="reset">réinitialiser</el-button>
      <el-button
        type="primary"
        @click="AddSubCategories"
        color="#fd7d1bdc"
        style="color: white"
        >Ajouter</el-button
      >
    </el-form>
  </el-card>
</template>

<script>
import { ref } from "vue";

import categoryService from "../services/categoryService";
import { ElNotification } from 'element-plus';

 
export default {
  name: "AddSubCategory",
  data() {
    return {
      forms: {
        name: "",
        description: "",
        icon: "",
        idCategory: "",
      },
      dialogFormVisible: ref(false),
      formLabelWidth: "140px",

      search: ref(""),
    };
  },
  methods: {
    AddSubCategories() {
      try{  const response = categoryService.AddSubCategory({
        idCategory :this.forms.idCategory,
        name: this.forms.name,
        description: this.forms.description,
        icon: this.forms.icon,
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
      reset(){
        this.forms.name = '';
        this.forms.description = '';
                this.forms.icon = '';
this.forms.idCategory='';


      },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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
</style>
