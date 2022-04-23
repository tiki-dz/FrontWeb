<script>
import { ElNotification } from "element-plus/es";

export default {
  data() {
    return {
      activeTab: "ItemView",
      search: "",
    };
  },
  methods: {
    logout() {
      if (localStorage.getItem("LoggedUser")) {
        localStorage.removeItem("LoggedUser");
        ElNotification({
          title: "Get back soon !",
          message: "We are waiting for you",
          type: "success",
        });
        this.$router.push({ name: "login" });
      } else {
        ElNotification({
          title: "Warning",
          message: "Server error",
          type: "warning",
        });
      }
    },
  },
};
</script>

<template>
  <el-row>
    <el-col :span="4">
      <!-- side menu  -->
      <aside>
        <el-scrollbar height="fill" class="leftCol">
          <img src="../assets/logoo.png" class="logo" />
          <el-divider />

          <el-menu
            active-text-color="#ffd04b"
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="handleSelect"
          >
            <router-link to="/home">
              <el-menu-item index="1">
                <i class="fa-solid fa-gauge"></i>&nbsp;&nbsp;
                <span>Accueil</span>
              </el-menu-item>
            </router-link>
            <el-sub-menu index="2">
              <template #title>
                <i class="fa-solid fa-users-gear"></i>&nbsp;&nbsp;
                <span> Administrateur</span>
              </template>
              <el-menu-item-group>
                <router-link to="/home/AddAdmin">
                  <el-menu-item index="2-1" @click="activeTab = 'ItemView'"
                    >Ajouter</el-menu-item
                  >
                </router-link>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <i class="fa-solid fa-handshake-simple"></i>&nbsp;&nbsp;
                <span> Partenaire</span>
              </template>
              <el-menu-item-group>
                <router-link to="/home/AddPartner">
                  <el-menu-item index="3-1" @click="activeTab = 'AddPartenaire'"
                    >Ajouter</el-menu-item
                  >
                </router-link>
              </el-menu-item-group>
            </el-sub-menu>
            <router-link to="/home/Client">
              <el-sub-menu index="4">
                <template #title>
                  <i class="fa-solid fa-users-line"></i>&nbsp;&nbsp;
                  <span>Client</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-1"></el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
            </router-link>

            <el-menu-item index="5">
              <i class="fa-solid fa-shapes"></i>&nbsp;&nbsp;
              <span>Categories</span>
            </el-menu-item>
            <router-link to="/home/EventList">
              <el-menu-item index="6">
                <i class="fa-solid fa-calendar-check"></i>&nbsp;&nbsp;
                <span>Event</span>
              </el-menu-item>
            </router-link>

            <el-menu-item index="7" id="deconnexion" @click="logout">
              <i class="fa-solid fa-right-from-bracket"></i>&nbsp;&nbsp;
              <span>Deconnexion</span>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </aside>
    </el-col>
    <el-col :span="20" class="padding">
      <router-view :key="$route.fullPath"/>
    </el-col>
  </el-row>
</template>
<style scoped>
aside {
  height: 100vh;
  background-color: rgb(255, 251, 248);
}
.el-menu-vertical-demo {
  background-color: rgb(255, 251, 248);
  height: 100%;
}
#deconnexion {
  margin-bottom: 1%;
}
.padding .el-col {
  padding: 0px 10px;
}
.logo {
  width: 40%;
  height: 10%;
  margin: 11% auto;
  display: flex;
  padding-top: 10%;
}
.menuItem {
  text-align: center;
  padding: "10px";
}
.el-menu-item-group {
  background-color: rgb(255, 251, 248);
  padding-left: 10%;
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
  padding-bottom: 50px;
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
.leftCol .el-card {
  margin: 4%;
}
</style>
