<script>
import authService from "../services/authService";
//import { Search } from "@element-plus/icons-vue";
export default {
  data() {
    return {
      ruleForm: {
        recherche: "",
        firstName: "",
        lastName: "",
        password: "",
        password2: "",
        email: "",
        naissance: "",
        phoneNumber: "",
        options: [],
      },

      sexe: [
        {
          value: "FEMME",
          label: "FEMME",
        },
        {
          value: "HOMME",
          label: "HOMME",
        },
      ],
      options: [
        {
          value: "Administrateur",
          label: "Administrateur",
        },
        {
          value: "Partenaire",
          label: "Partenaire",
        },
        {
          value: "Client",
          label: "Client",
        },
      ],
    };
  },

  methods: {
    async signup() {
      try {
        if (this.password === this.password2) {
          const response = await authService.register({
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthday,
            sexe: this.sexe,
            email: this.email,
            password: this.password,
            password2: this.password2,
            phoneNumber: this.phoneNum,
            type: this.type,
          });
          alert("regiter successfull");
          console.log(response.data);
        } else {
          this.error = "problem in confirmation of the password";
        }
      } catch (error) {
        this.error = error.response.data.error;
        console.log(this.error);
      }
    },
  },
};
</script>

<template>
  <!-- deviding screen into two columns: sidebar and content -->
  <el-row>
    <el-col :span="5">
      <!-- side menu  -->
      <aside>
        <el-scrollbar height="fill">
          <img src="../assets/logoo.png" class="logo" />

          <el-divider />
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect"
          >
            <el-menu-item index="2" class="menuItem">
              <el-icon class="el-input__icon"><home-filled /></el-icon>
              <router-link to="login">login</router-link>
            </el-menu-item>

            <el-menu-item index="2" class="menuItem">
              <el-icon class="el-input__icon"><home-filled /></el-icon>

              <router-link to="">Home</router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon class="el-input__icon"><home-filled /></el-icon>

              <router-link to="">Ajouter</router-link>
            </el-menu-item>
            <el-card :body-style="{ padding: '10px' }">
              <router-link to="login">login</router-link>
            </el-card>
            <el-card :body-style="{ padding: '10px' }">
              <router-link to="">Home</router-link>
            </el-card>
            <el-card :body-style="{ padding: '10px' }">
              <router-link to="login">login</router-link>
            </el-card>
            <el-card :body-style="{ padding: '10px' }">
              <router-link to="">Home</router-link>
            </el-card>
            <el-card :body-style="{ padding: '10px' }">
              <router-link to="login">login</router-link>
            </el-card>
            <el-card :body-style="{ padding: '10px' }">
              <router-link to="">Home</router-link>
            </el-card>
            <el-card :body-style="{ padding: '10px' }">
              <router-link to="login">login</router-link>
            </el-card>
            <el-card :body-style="{ padding: '10px' }">
              <router-link to="">Home</router-link>
            </el-card>
          </el-menu>
        </el-scrollbar>
      </aside>
    </el-col>
    <el-col :span="19" class="padding">
      <nav>
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
                          :to="{ path: '/' }"
                          style="color: aliceblue"
                          >Dashboard</el-breadcrumb-item
                        >
                        <el-breadcrumb-item
                          ><a href="/" style="color: aliceblue"
                            >Cree un compte</a
                          ></el-breadcrumb-item
                        ></el-breadcrumb
                      >
                    </el-col>
                    <template> </template>

                    <el-col :span="12">
                      <el-input
                        v-model="recherche"
                        placeholder="Chercher un id,nom ou utilisateur"
                      >
                        <template #prefix>
                          <el-icon class="el-input__icon"><search /></el-icon>
                        </template>
                      </el-input>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 20px">
          <el-col :span="24">
            <!-- body cards  -->
            <el-card>
              <template #header>
                <div class="card-header">
                  <span>Créer un compte</span>
                </div>
              </template>

              <el-form
                ref="ruleFormRef"
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
                      v-model="firstName"
                      placeholder="Prenom"
                      required
                    ></el-input>
                    <div class="invalid-feedback"></div
                  ></el-col>
                  <el-col :span="10"
                    ><el-input
                      v-model="lastName"
                      placeholder="Nom"
                      required
                    ></el-input>
                    <div class="invalid-feedback"></div
                  ></el-col>
                </el-row>
                <br />
                <el-row>
                  <el-col :span="20"
                    ><el-input v-model="email" placeholder="email"></el-input
                  ></el-col>
                </el-row>
                <br />
                <el-row>
                  <el-col class="form" :span="10"
                    ><el-input
                      id="password"
                      placeholder="mot de passe"
                      v-model="password"
                      show-password
                    ></el-input
                  ></el-col>
                  <el-col :span="10"
                    ><el-input
                      id="password2"
                      placeholder="confirmer le mot de passe"
                      v-model="password2"
                      show-password
                    ></el-input
                  ></el-col>
                </el-row>
                <br />
                <el-row>
                  <el-col :span="20"
                    ><el-input
                      id="phoneNumber"
                      v-model="phoneNumber"
                      placeholder="numero de telephone"
                    ></el-input
                  ></el-col>
                </el-row>
                <br />
                <el-row>
                  <el-col :span="7"
                    ><el-date-picker
                      id="birthDate"
                      v-model="birthDate"
                      type="date"
                      placeholder="date de naissance"
                    >
                    </el-date-picker
                  ></el-col>
                  <el-col :span="7"
                    ><el-select
                      id="exampleFormControlSelect1"
                      placeholder="sexe"
                    >
                      <el-option
                        v-for="item in sexe"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option> </el-select
                  ></el-col>
                  <el-col style="margin-right: 1%" :span="6"
                    ><el-select v-model="type">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option> </el-select
                  ></el-col>
                </el-row>
                <br /><br />
                <!-- sign up button  -->
                <el-row>
                  <el-col :span="4"
                    ><el-button @click="register" type="warning" round
                      >s'inscrire</el-button
                    ></el-col
                  >
                </el-row>
              </el-form>
            </el-card>
            <template> </template>
          </el-col>
        </el-row>
      </nav>
    </el-col>
  </el-row>
</template>

<style>
aside {
  height: 100vh;
  background-color: rgb(255, 251, 248);
}

.padding .el-col {
  padding: 0px 10px;
}
.logo {
  width: 60%;
  height: 10%;
  margin: 11% auto;
  display: flex;
}
.header {
  height: 16vh;
  background-color: var(--vt-c-orange);
}
.menuItem {
  text-align: center;
  padding: "10px";
}
li {
  list-style: none;
  text-decoration: none;
  color: black;
}
.el-scrollbar .el-card {
  border-radius: 10px;
  margin: 4% 10%;
  text-align: center;
}
a {
  text-decoration: none;
  color: black;
}
.el-divider {
  margin: 0;
  padding-bottom: 10px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.radio {
  width: 300px;
  color: #000000;
  padding-left: 11px;
  padding-top: 7px;
  float: left;
}
.form {
  margin-right: 0.3%;
  padding: 0;
}
</style>
