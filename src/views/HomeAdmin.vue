<script setup>
import{ref} from 'vue'
const input = ref('')
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
          <el-card :body-style="{ padding: '10px' }">
            <router-link to="login">login</router-link>
          </el-card>
          <el-card :body-style="{ padding: '10px' }">
            <router-link to="">Home</router-link>
          </el-card>
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
                <div class="card-body"></div>
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
                :model="ruleForm"
                :rules="rules"
                label-width="120px"
                class="demo-ruleForm"
                :size="formSize"
              >
                <el-input v-model="input" placeholder="Please input" />
              </el-form>
            </el-card>
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
  height: 15vh;
  background-color: var(--vt-c-orange);
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
</style>
