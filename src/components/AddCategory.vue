<template>
  <nav class="addCategory">
    <!-- nav bar  -->
    <el-row style="margin-bottom: 10px; margin-top: 10px">
      <!-- total columns is 24 -->
      <el-col :span="24">
        <el-card class="header">
          <div class="card card-frame col-4">
            <div class="card-body">
              <el-row>
                <el-col :span="8" class="path">
                  <el-breadcrumb separator="/">
                    <el-breadcrumb-item
                      style="color: aliceblue"
                      :to="{ path: '/home/CategoryList' }"
                      >Categories</el-breadcrumb-item
                    >
                    <el-breadcrumb-item
                      ><a href="/home/AddCategory" style="color: aliceblue"
                        >Ajouter une catégorie</a
                      ></el-breadcrumb-item
                    ></el-breadcrumb
                  >
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-scrollbar max-height="80vh" class="addCategory">
          <!-- header -->
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <!-- <router-link to="/home/CategoryList">
          <span id="preced">precedente</span>
        </router-link> -->
                <span><h1>Ajouter une catégorie</h1></span>
              </div>
            </template>

            <!-- Form -->

            <el-form :model="form" id="app" method="post">
              <el-form-item
                label="Name"
                :label-width="formLabelWidth"
                prop="nom"
              >
                <el-input v-model="form.name" autocomplete="off" id="name" />
                <p
                  v-if="form.errors.length"
                  style="font-size: 10px; margin-left: 20%; color: red"
                >
                  Donnez un nom a votre categorie
                </p>
                <!-- <br>
                <ul>
                  <li v-for="error in errors" :key="error">{{ error }}</li>
                </ul> -->
              </el-form-item>
              <el-form-item
                label="Description"
                :label-width="formLabelWidth"
                prop="description"
              >
                <el-input
                  v-model="form.description"
                  autocomplete="off"
                  id="description"
                />
              </el-form-item>
              <el-form-item label="Icon" :label-width="formLabelWidth">
                <el-input v-model="form.icon" autocomplete="off" />
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
                <el-button style="margin-right: 1%" round @click="reset">
                  <i class="fa-solid fa-arrows-rotate"></i> &nbsp;
                  &nbsp;Réinitialiser</el-button
                >
                <el-button
                  type="primary"
                  @click="checkForm"
                  color="#fd7d1bdc"
                  style="color: white"
                  round
                >
                  <i class="fa-solid fa-circle-plus"></i> &nbsp; &nbsp;
                  Ajouter</el-button
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
import { ElNotification } from "element-plus";
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
        errors: [],
      },
      formLabelWidth: "140px",

      search: ref(""),
    };
  },
  methods: {
    function() {
      ".icon-picker".iconpicker();
    },

    AddCategory() {
      try {
        const response = categoryService.AddCategory({
          name: this.form.name,
          description: this.form.description,
          icon: this.form.icon,
        });

        ElNotification({
          title: "Ajouter  avec succees",
          message: "categorie ajouter ",
          type: "success",
        });
        this.reset();
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    checkForm() {
      this.form.errors = [];
      if (this.form.name === "") {
        this.form.errors.push(" nom de categorie est obligatoire.");
      } else {
        this.AddCategory();
      }
    },

    reset() {
      this.form.name = "";
      this.form.description = "";
      this.form.icon = "";
    },
  },
};
</script>

<style>
.addCategory .el-button--text {
  margin-right: 15px;
}
.addCategory .el-select {
  width: 300px;
}
.addCategory .el-input {
  width: 300px;
}
.addCategory .el-form-item__label {
  text-align: left;
  padding-left: 10%;
}
#preced {
  margin-right: 80%;
  color: #fd7d1bdc;
}
.buttons .el-button {
  flex: 1;
  max-width: 40%;
  padding: 2%;
}
</style>
