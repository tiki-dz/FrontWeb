<script scope>
import authService from "../services/authService";
//import { Search } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";

export default {
  name: "AddPartenaire",
  data() {
    return {
      options: [],
      ruleForm: {
        search: "",
        firstName: "",
        lastName: "",
        password: "",
        password2: "",
        email: "",
        birthDate: "",
        phoneNumber: "",
        sexe: "",
        city: "",
        orgaName: "",
        orgaDesc: "",
        orgaType: "",
        orgaAddress: "",
      },

      sexeopt: [
        {
          value: 0,
          label: "FEMME",
        },
        {
          value: 1,
          label: "HOMME",
        },
      ],
      orgaType: [
        {
          value: "Cinema",
          label: "Cinema",
        },
        {
          value: "Stadium",
          label: "Stadium",
        },
        {
          value: "Theatre",
          label: "Theatre",
        },
        {
          value: "Other",
          label: "Other",
        },
      ],
    };
  },

  methods: {
    async handleCurrentChange() {
      let city = await authService.cities();
      this.options = [];
      for (let index = 0; index < city.data.data.length; index++) {
        const element = city.data.data[index];
        this.options.push({ value: element.name, label: element.name });
      }
    },
    async signup() {
      try {
        if (this.ruleForm.password == this.ruleForm.password2) {
          const response = await authService.signup({
            firstName: this.ruleForm.firstName,
            lastName: this.ruleForm.lastName,
            birthDate: this.ruleForm.birthDate,
            sexe: this.ruleForm.sexe,
            email: this.ruleForm.email,
            password: this.ruleForm.password,
            city: this.ruleForm.city,
            phoneNumber: this.ruleForm.phoneNumber,
            orgaName: this.ruleForm.orgaName,
            orgaDesc: this.ruleForm.orgaDesc,
            orgaType: this.ruleForm.orgaType,
            orgaAddress: this.ruleForm.orgaAddress,
          });
          ElNotification({
            title: "Succès",
            message: "Utilisateur créé avec succès ",
            type: "success",
          });

          console.log(response.data);
        } else {
          this.error = "problem in confirmation of the git fepassword";
        }
      } catch (error) {
        ElNotification({
          title: "Echec",
          message: "Impossible de créer l'utilisateur ",
          type: "error",
        });
        console.log(error);
      }
    },
  },
  created(){
    this.handleCurrentChange()
  }
};
</script>

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
                <el-col :span="10" class="path">
                  <el-breadcrumb separator="/">
                    <el-breadcrumb-item style="color: aliceblue"
                      >Utilisateurs</el-breadcrumb-item
                    >
                    <el-breadcrumb-item
                      ><a href="/home/AddPartner" style="color: aliceblue"
                        >Ajouter un partenaire</a
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
        <el-scrollbar max-height="80vh">
          <el-card>
            <template #header>
              <div class="card-header">
                <span><h1>Créer un compte de partenaire</h1></span>
              </div>
            </template>

            <el-form
              ref="ruleForm"
              :size="formSize"
              :model="ruleForm"
              status-icon
              :rules="rules"
              label-width="120px"
              class="demo-ruleForm"
            >
              <!-- body form  -->
              <el-row>
                <el-col class="form" :span="10"
                  ><el-input
                    v-model="ruleForm.firstName"
                    placeholder="Prenom"
                    @focus="handleCurrentChange"
                    required
                  ></el-input>
                  <div class="invalid-feedback"></div
                ></el-col>
                <el-col :span="10"
                  ><el-input
                    v-model="ruleForm.lastName"
                    placeholder="Nom"
                    required
                  ></el-input>
                  <div class="invalid-feedback"></div
                ></el-col>
              </el-row>
              <br />
              <el-row>
                <el-col :span="20"
                  ><el-input
                    v-model="ruleForm.email"
                    placeholder="email"
                  ></el-input
                ></el-col>
              </el-row>
              <br />
              <el-row>
                <el-col class="form" :span="10"
                  ><el-input
                    id="password"
                    placeholder="mot de passe"
                    v-model="ruleForm.password"
                    show-password
                  ></el-input
                ></el-col>
                <el-col :span="10"
                  ><el-input
                    id="password2"
                    placeholder="confirmer le mot de passe"
                    v-model="ruleForm.password2"
                    show-password
                  ></el-input
                ></el-col>
              </el-row>
              <br />
              <el-row>
                <el-col :span="20"
                  ><el-input
                    id="phoneNumber"
                    v-model="ruleForm.phoneNumber"
                    placeholder="numero de telephone"
                  ></el-input
                ></el-col>
              </el-row>
              <br />
              <el-row>
                <el-col :span="5"
                  ><el-date-picker
                    id="birthDate"
                    v-model="ruleForm.birthDate"
                    type="date"
                    placeholder="date de naissance"
                    value-format="YYYY/MM/DD"
                  >
                  </el-date-picker
                ></el-col>
                <el-col :span="7"
                  ><el-select
                    id="exampleFormControlSelect1"
                    placeholder="sexe"
                    v-model="ruleForm.sexe"
                  >
                    <el-option
                      v-for="item in sexeopt"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option> </el-select
                ></el-col>
                <el-col :span="5">
                  <el-select
                    id="city"
                    v-model="ruleForm.city"
                    placeholder="ville"
                    filterable
                    class="input-field"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-col>
              </el-row>
              <br />
              <el-row>
                <el-col class="form" :span="10"
                  ><el-input
                    id="orgaName"
                    placeholder="Nom de l organisation"
                    v-model="ruleForm.porgaName"
                  ></el-input
                ></el-col>
                <el-col :span="10"
                  ><el-input
                    id="orgaDesc"
                    placeholder="Description sur l organisation"
                    v-model="ruleForm.orgaDesc"
                  ></el-input
                ></el-col>
              </el-row>
              <br />
              <el-row>
                <el-col class="form" :span="4"
                  ><el-select
                    id="exampleFormControlSelect1"
                    placeholder="Categorie"
                    v-model="ruleForm.orgaType"
                  >
                    <el-option
                      v-for="item in orgaType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option> </el-select
                ></el-col>
                <el-col :span="16"
                  ><el-input
                    id="orgaAddress"
                    placeholder="Adress de l organisation"
                    v-model="ruleForm.orgaAddress"
                  ></el-input
                ></el-col>
              </el-row>
              <br />

              <!-- sign up button  -->
              <el-row
                style="
                  width: 100%;
                  display: flex;
                  margin-top: 3%;
                  justify-content: center;
                "
              >
                <el-button
                  round
                  @click="signup"
                  type="primary"
                  color="#fd7d1bdc"
                  style="color: white"
                  ><i class="fa-solid fa-user-plus"></i> &nbsp; &nbsp;
                  Ajouter</el-button
                >
              </el-row>
            </el-form>
            <br />
          </el-card>
        </el-scrollbar>
      </el-col>
    </el-row>
  </nav>
</template>

<style scoped>
.el-input {
  --el-input-focus-border-color: rgba(72, 71, 71, 0.244);
}
.el-button {
  flex: 1;
  padding: 2%;
  max-width: 40%;
}
</style>
