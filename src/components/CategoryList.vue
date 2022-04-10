<script scope>
import authService from "../services/authService";
//import { Search } from "@element-plus/icons-vue";
export default {
  name: "ItemView",
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
    };
  },

  methods: {
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
          });

          alert("regiter successfull");
          console.log(response.data);
        } else {
          this.error = "problem in confirmation of the git fepassword";
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
      <br /><br />
      <!-- sign up button  -->
      <el-row>
        <el-col :span="4"
          ><el-button @click="signup" type="warning" round
            >Ajouter</el-button
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
