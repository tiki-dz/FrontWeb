<script scope>
import authService from "../services/authService";
import { ElNotification } from "element-plus";

//import { Search } from "@element-plus/icons-vue";
export default {
  name: "AddPartenaire",
  data() {
    return {
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
    async signupPartenair() {
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
            title: "Success",
            message: "Compte cree avec succee",
            type: "success",
          });

          console.log(response.data);
        } else {
          this.error = "problem in confirmation of the git fepassword";
          ElNotification({
            title: "Warning",
            message: "mot de passe confirmer incorrectement",
            type: "warning",
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>Créer un compte</span>
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
          ><el-input v-model="ruleForm.email" placeholder="email"></el-input
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
          <el-input
            id="city"
            v-model="ruleForm.city"
            placeholder="ville"
          ></el-input>
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
      <br />
      <!-- sign up button  -->
      <el-row>
        <el-col :span="4"
          ><el-button @click="signup" type="warning" round
         style="background-color:#fd7d1bdc;
  margin: 0 auto;"    >Ajouter</el-button
          ></el-col
        >
      </el-row>
    </el-form>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </el-card>
</template>

<style scoped></style>
