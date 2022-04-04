<script>
import ItemView from '../components/ItemView.vue';
export default {
  components: { ItemView },
  data() {
    return {
        search: ""
    }
}}
</script>

<template>
  <!-- deviding screen into two columns: sidebar and content -->
  <el-row>
    <el-col :span="4">
      <!-- side menu  -->
      <aside>
        <el-scrollbar height="fill" class="leftCol">
          <img src="../assets/logoo.png" class="logo" />

          <el-divider />
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect"
          >
            <router-link to="">
              <el-card :body-style="{ padding: '10px' }" shadow="hover"
                ><i class="fa-solid fa-user-lock"></i> &nbsp; Admins
              </el-card>
            </router-link>
            <router-link to="">
              <el-card :body-style="{ padding: '10px' }" shadow="hover">
                <i class="fa-solid fa-handshake"></i> &nbsp; Partners
              </el-card>
            </router-link>
            <router-link to="">
              <el-card :body-style="{ padding: '10px' }" shadow="hover">
                <i class="fa-solid fa-people-group"></i>&nbsp; &nbsp; &nbsp;Clients
              </el-card>
            </router-link>
            <router-link to="">
              <el-card :body-style="{ padding: '10px' }" shadow="hover"
                ><i class="fa-solid fa-user-lock"></i> &nbsp; Admins
              </el-card>
            </router-link>
            <router-link to="">
              <el-card :body-style="{ padding: '10px' }" shadow="hover">
                <i class="fa-solid fa-handshake"></i> &nbsp; Partners
              </el-card>
            </router-link>
            <router-link to="">
              <el-card :body-style="{ padding: '10px' }" shadow="hover">
                <i class="fa-solid fa-people-group"></i>&nbsp; &nbsp; &nbsp;Clients
              </el-card>
            </router-link>
            <router-link to="">
              <el-card :body-style="{ padding: '10px' }" shadow="hover"
                ><i class="fa-solid fa-user-lock"></i> &nbsp; Admins
              </el-card>
            </router-link>
            <router-link to="">
              <el-card :body-style="{ padding: '10px' }" shadow="hover">
                <i class="fa-solid fa-handshake"></i> &nbsp; Partners
              </el-card>
            </router-link>
            <router-link to="">
              <el-card :body-style="{ padding: '10px' }" shadow="hover">
                <i class="fa-solid fa-people-group"></i>&nbsp; &nbsp; &nbsp;Clients
              </el-card>
            </router-link>
            <router-link to="">
              <el-card :body-style="{ padding: '10px' }" shadow="hover">
                <i class="fa-solid fa-right-from-bracket"></i>&nbsp; &nbsp; Log Out 
              </el-card>
            </router-link>
           </el-menu>
        </el-scrollbar>
      </aside>
    </el-col>
    <el-col :span="20" class="padding">
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
                        v-model="search"
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
        <el-row >
          <el-col :span="24">
            <el-scrollbar max-height="80vh">
            <item-view></item-view>
            </el-scrollbar>
            <!-- body cards  -->
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
  width: 40%;
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
.leftCol .el-card{
  margin: 4%;
}
</style>
