<template>
  <nav>
    <!-- nav bar  -->
    <el-row style="margin-bottom: 10px; margin-top: 10px">
      <!-- total columns is 24 -->
      <el-col :span="24">
        <el-card class="header">
          <div class="card card-frame col-4">
            <div class="card-body">
              <el-row>
                <el-col :span="12" class="path">
                  <el-breadcrumb separator="/">
                    <el-breadcrumb-item
                      :to="{ path: '/home/CategoryList' }"
                      style="color: aliceblue"
                      >Catégories</el-breadcrumb-item
                    >
                    <el-breadcrumb-item
                      ><router-link
                        :to="'/home/subList/' + $route.params.id"
                        style="color: aliceblue"
                      >
                        Catégorie N° {{ $route.params.id }}</router-link
                      >
                    </el-breadcrumb-item>
                    <el-breadcrumb-item
                      ><a href="/home/Event" style="color: aliceblue"
                        >Ajouter sous catégorie</a
                      ></el-breadcrumb-item
                    >
                  </el-breadcrumb>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-scrollbar max-height="80vh" class="addSub">
          <!-- header -->
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span><h1>Ajouter une sous catégorie</h1> </span>
              </div>
            </template>

            <!-- Form -->

            <el-form :model="forms">
              <el-form-item label="Name" :label-width="formLabelWidth">
                <el-input v-model="forms.name" autocomplete="off" />
              </el-form-item>
              <el-form-item label="Description" :label-width="formLabelWidth">
                <el-input v-model="forms.description" autocomplete="off" />
              </el-form-item>
              <el-form-item label="Icon" :label-width="formLabelWidth">
                <el-input v-model="forms.icon" autocomplete="off" />
              </el-form-item>
              <div
                class="buttons"
                style="
                  width: 100%;
                  display: flex;
                  margin-top: 3%;
                  justify-content: center;
                "
              >
                <el-button @click="reset" round
                  ><i class="fa-solid fa-arrows-rotate"></i> &nbsp; &nbsp;
                  Réinitialiser</el-button
                >
                <el-button
                  type="primary"
                  round
                  @click="AddSubCategories"
                  color="#fd7d1bdc"
                  style="color: white"
                >
                  <i class="fa-solid fa-circle-plus"></i> &nbsp;
                  &nbsp;Ajouter</el-button
                >
              </div>
            </el-form>
          </el-card>
        </el-scrollbar>
      </el-col>
    </el-row>
  </nav>
</template>

<script>
import { ref } from "vue";

import categoryService from "../services/categoryService";
import { ElNotification } from "element-plus";

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
      try {
        const response = categoryService.AddSubCategory({
          idCategory: this.$route.params.id,
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
      } catch (error) {
        ElNotification({
          title: "Erreur d'ajout",
          message: "Veuillez réessayer ",
          type: "error",
        });
        console.log(error);
      }
    },
    reset() {
      this.forms.name = "";
      this.forms.description = "";
      this.forms.icon = "";
      this.forms.idCategory = "";
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
<style>
.addSub .el-button--text {
  margin-right: 15px;
}
.addSub .el-select {
  width: 300px;
}
.addSub .el-input {
  width: 300px;
}
.addSub .el-form-item__label {
  text-align: left;
  padding-left: 10%;
}
.buttons1 .el-button {
  flex: 1;
  max-width: 40%;
  padding: 2%;
}
</style>
