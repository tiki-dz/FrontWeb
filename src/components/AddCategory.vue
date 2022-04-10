<template>
  <!-- header -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Ajouter categorie</span>
      </div>
    </template>

    <!-- Form -->

    <el-form :model="form">
      
      <el-form-item label="name" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="description" :label-width="formLabelWidth">
        <el-input v-model="form.description" autocomplete="off" />
      </el-form-item>
      <el-form-item label="icon" :label-width="formLabelWidth">
        <el-input v-model="form.icon" autocomplete="off" />
      </el-form-item>
      <el-button @click="dialogFormVisible = false">Cancel</el-button>
      <el-button
        type="primary"
        @click="AddCategory"
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
        idSubCategory: "",
      },
      dialogFormVisible: ref(false),
      formLabelWidth: "140px",

      search: ref(""),
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    AddCategory() {
      this.dialogFormVisible = false
      try{  const response = categoryService.AddCategory({
        
        name: this.form.name,
        description: this.form.description,
        icon: this.form.icon,
      });
              

      console.log(response.data);
      }catch(error) {
        console.log("hgfdsxcvghgfdcv"),
        console.log(error);
      }
    
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
