<script scope>
import categoryService from "../services/categoryService";
import { ElNotification } from "element-plus";
import "element-plus/es/components/loading/style/css";
import { ElLoading } from "element-plus";

export default {
  name: "ItemView",
  data() {
    return {
      url: -1,
      name: "",
      subCategories: [],
    };
  },

  methods: {
    route(id) {
      this.$router.push("/home/subCategory/" + id);
    },
    async deleteSousCtegory(id) {
      try {
        let response = await categoryService.DeleteSubCat(id);
        console.log(response.data.data);
        ElNotification({
          title: "supprimer avec succees",
          message: "sous categorie supprimer ",
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

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    async getSubCategories(idCategory) {
      const loading = ElLoading.service({
        lock: true,
        text: "Chargement",
        background: "rgba(0, 0, 0, 0.7)",
      });
      console.log(idCategory);
      let response = await categoryService.getSubCategories(idCategory);
      this.subCategories = response.data.data.rows;
      this.name = this.subCategories[0].Category.name;
      console.log(this.subcategories);
      loading.close()
    },
    addSubCategory() {
      this.$router.push({ name: "subCategory", params: { id: this.url } });
    },
  },
  created() {
    this.url = this.$route.params.idCategory;
    this.getSubCategories(this.url);
  },
};
</script>

<template>
  <nav class="sublist">
    <!-- nav bar  -->
    <el-row style="margin-bottom: 10px; margin-top: 10px">
      <!-- total columns is 24 -->
      <el-col :span="24">
        <el-card class="header">
          <div class="card card-frame col-4">
            <div class="card-body">
              <el-row>
                <el-col :span="6" class="path">
                  <el-breadcrumb separator="/">
                    <el-breadcrumb-item
                      :to="{ path: '/home/CategoryList' }"
                      style="color: aliceblue"
                      >Catégories</el-breadcrumb-item
                    >
                    <el-breadcrumb-item
                      ><router-link
                        :to="'/home/subList/' + url"
                        style="color: aliceblue"
                        >N° {{ url }} : {{ name }}</router-link
                      ></el-breadcrumb-item
                    >
                  </el-breadcrumb>
                </el-col>
                <template> </template>

                <el-col :span="12">
                  <el-input
                    v-model="search"
                    placeholder="Chercher un id,nom ou utilisateur"
                  >
                    <template #prefix>
                      <el-icon class="el-input__icon"
                        ><i class="fa fa-search"></i
                      ></el-icon>
                    </template>
                  </el-input>
                </el-col>
                <el-col :span="4">
                  <button type="button" id="add" @click="addSubCategory()">
                    Ajouter sous catégorie
                  </button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-scrollbar max-height="80vh">
          <el-card>
            <template #header>
              <div class="card-header">
                <span
                  ><h1>Sous catégories de "{{ name }} "</h1></span
                >
              </div>
            </template>
            <el-card id="cardlist">
              <el-row id="nom"
                ><el-col :span="3">ID Catégorie</el-col>
                <el-col :span="3"> ID Sous- Catégorie</el-col>
                <el-col :span="4"> Nom</el-col>
                <el-col :span="6"> Description</el-col>
                <el-col :span="4"> icone</el-col>
                <el-col :span="4"> Action</el-col>
              </el-row>
              <el-divider />
              <el-row v-for="subCategorie in subCategories" :key="subCategorie">
                <el-col :span="3">{{ subCategorie.CategoryIdCategory }}</el-col>
                <el-col :span="3">{{ subCategorie.idSubCategory }}</el-col>
                <el-col :span="4">{{ subCategorie.name }}</el-col>
                <el-col :span="6">{{ subCategorie.description }}</el-col>
                <el-col :span="4">{{ subCategorie.icon }}</el-col>

                <el-col :span="4">
                  <el-button
                    type="danger"
                    plain
                    @click="deleteSousCtegory(subCategorie.idSubCategory)"
                    >supprimer</el-button
                  ></el-col
                >
                <el-divider border-style="double" />
              </el-row>
            </el-card>
            <br />
            <br />
          </el-card>
        </el-scrollbar>
      </el-col>
    </el-row>
  </nav>
</template>

<style scoped>
#add {
  box-shadow: 0px 0px 3px rgb(154, 154, 154);
  cursor: pointer;

  color: #fd7d1bdc;
}
#cardlist {
  width: 100%;
}
#nom {
  color: #fd7d1bdc;
}
.sublist .el-col {
  text-align: center;
}
.el-input .el-input__icon {
margin-top: 5px;}
</style>
