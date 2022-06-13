<script scope>
import usersService from "../services/usersService";
import "element-plus/es/components/loading/style/css";
import { ElLoading } from "element-plus";
export default {
  name: "UsersList",
  data() {
    return {
      sendNotification: false,
      currentEmail: "",
      currentPage: 1,
      state: "",
      titre: "",
      description: "",
      Allusers: [],
      pages: 1,
      currentEmailToNotify: "",
      centerDialogVisibleActivate: false,
      centerDialogVisibleDeactivate: false,
      centerDialogVisible: false,
      pageSize: 14,
      totalPages: 1,
      totalItems: 0,
      filter: "",
      search: "",
      value1: true,
      value2: false,
      options: [
        {
          value: "",
          label: "Tous les utilisateur",
        },
        {
          value: "client",
          label: "Clients",
        },
        {
          value: "partner",
          label: "Partenaires",
        },
        {
          value: "admin",
          label: "Administrateur",
        },
      ],
    };
  },
  mounted: function () {
    this.handleCurrentChange(1);
  },
  methods: {
    showNotifyPopUp(email) {
      this.currentEmailToNotify = email;
      this.sendNotification = true;
    },
    clickActivate(email, state) {
      this.currentEmail = email;
      this.centerDialogVisibleActivate = true;
      this.state = state;
    },
    async sendNotifToOneUser() {
      this.sendNotification = false;
      let notification = await usersService.sendNotifToOneUser({
        title: this.titre,
        body: this.description,
        email: this.currentEmailToNotify,
      });
      if (notification.status == 200) {
        this.titre = "";
        this.description = "";
        ElNotification({
          title: "Succées",
          message: "Notification envoyé avec succées",
          type: "success",
        });
        return;
      }
    },
    clickDeactivate(email, state) {
      this.currentEmail = email;
      this.centerDialogVisibleDeactivate = true;
      this.state = state;
    },
    async handleCurrentChange(pageNumber) {
      const loading = ElLoading.service({
        lock: true,
        text: "Chargement",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let users = await usersService.AllUsers({
        page: pageNumber - 1 <= 0 ? 0 : pageNumber - 1,
        size: "10",
        search: this.search,
        filter: this.filter,
      });
      this.Allusers = users.data.clients;
      for (var i = 0; i < this.Allusers.length; i++) {
        if (this.Allusers[i].state == 1) {
          this.Allusers[i].state = true;
        } else {
          this.Allusers[i].state = false;
        }
      }
      loading.close();

      this.totalPages = users.data.totalPages;
      this.totalItems = users.data.totalItems;
    },
    async searchUser() {
      const loading = ElLoading.service({
        lock: true,
        text: "Chargement",
        background: "rgba(0, 0, 0, 0.7)",
      });
      console.log("wow");
      this.currentPage = 1;
      let users = await usersService.AllUsers({
        page: 0,
        size: "14",
        search: this.search,
        filter: this.filter,
      });
      loading.close();

      this.Allusers = users.data.clients;
      for (var i = 0; i < this.Allusers.length; i++) {
        if (this.Allusers[i].state == 1) {
          this.Allusers[i].state = true;
        } else {
          this.Allusers[i].state = false;
        }
      }
      this.totalPages = users.data.totalPages;
      this.totalItems = users.data.totalItems;
    },
    async activer(email, state) {
      this.centerDialogVisibleActivate = false;
      let result = await usersService.toogleAccount({
        email: email,
        state: state,
      });
      var foundIndex = this.Allusers.findIndex((x) => x.email == email);
      this.Allusers[foundIndex].state = !state;
      if (result.status == 200) {
        ElNotification({
          title: "Succées",
          message: "Compte activé avec succées",
          type: "success",
        });
      }
    },
    async desactiver(email, state) {
      this.centerDialogVisibleDeactivate = false;
      let result = await usersService.toogleAccount({
        email: email,
        state: state,
      });
      var foundIndex = this.Allusers.findIndex((x) => x.email == email);
      this.Allusers[foundIndex].state = !state;
      if (result.status == 200) {
        ElNotification({
          title: "Succées",
          message: "Compte desactivé avec succées",
          type: "success",
        });
      }
    },
    async updateFilter() {
      const loading = ElLoading.service({
        lock: true,
        text: "Chargement",
        background: "rgba(0, 0, 0, 0.7)",
      });
      let users = await usersService.AllUsers({
        page: 0,
        size: "14",
        search: this.search,
        filter: this.filter,
      });
      loading.close();
      this.Allusers = users.data.clients;
      for (var i = 0; i < this.Allusers.length; i++) {
        if (this.Allusers[i].state == 1) {
          this.Allusers[i].state = true;
        } else {
          this.Allusers[i].state = false;
        }
      }
      this.totalPages = users.data.totalPages;
      this.totalItems = users.data.totalItems;
    },
  },
};
</script>
<template>
  <el-dialog
    v-model="sendNotification"
    title="Notifier un utilisateur"
    width="60%"
    destroy-on-close
    center
  >
    <el-input
      style="width: 80%"
      v-model="titre"
      maxlength="10"
      placeholder="Please input"
      show-word-limit
      type="text"
    />
    <div style="margin: 20px 0" />

    <el-input
      v-model="description"
      maxlength="30"
      placeholder="Please input"
      show-word-limit
      type="textarea"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="sendNotification = false">Annuler</el-button>
        <el-button
          type="primary"
          :disabled="description.length == 0 || titre.length == 0"
          @click="this.sendNotifToOneUser()"
          >Envoyer</el-button
        >
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="centerDialogVisibleActivate"
    title="Alerte"
    width="30%"
    destroy-on-close
    center
  >
    <span>Alerte:étes vous sur de vouloir activer ce compte</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisibleActivate = false">Non</el-button>
        <el-button
          type="primary"
          @click="activer(this.currentEmail, this.state)"
          >Oui</el-button
        >
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="centerDialogVisibleDeactivate"
    title="Alert"
    width="30%"
    destroy-on-close
    center
  >
    <span>Alert: étes vous sur de vouloir désactiver ce compte</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisibleDeactivate = false"
          >Non</el-button
        >
        <el-button
          type="primary"
          @click="desactiver(this.currentEmail, this.state)"
          >Oui</el-button
        >
      </span>
    </template>
  </el-dialog>
  <el-row style="margin-bottom: 10px; margin-top: 10px">
    <!-- total columns is 24 -->
    <el-col :span="24">
      <el-card class="header">
        <div class="card card-frame col-4">
          <div class="card-body">
            <el-row>
              <el-col :span="6" class="path"
                ><el-breadcrumb separator="/">
                  <el-breadcrumb-item style="color: aliceblue"
                    >Utilisateurs</el-breadcrumb-item
                  >
                  <el-breadcrumb-item
                    ><a href="/home/Users" style="color: aliceblue"
                      >Tous</a
                    ></el-breadcrumb-item
                  ></el-breadcrumb
                >
              </el-col>
              <el-col :span="12">
                <el-input
                  v-model="search"
                  placeholder="Chercher un email de l'utilisateur"
                >
                  <template #prefix>
                    <el-icon class="el-input__icon"
                      ><i class="fa fa-search"></i
                    ></el-icon>
                  </template>
                </el-input>
              </el-col>
              <!-- <el-col :span="4">
                <button type="button" id="add" @click="searchUser()">
                  Search for a user
                </button></el-col
              > -->
            </el-row>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <br />

  <el-row justify="start">
    <el-col :span="4" :offset="3">
      <p style="font-size: 22px">Filtre:</p>
    </el-col>

    <el-col :span="10">
      <el-select
        :change="updateFilter"
        v-model="filter"
        style="margin: 0px; padding: 0px"
        class="m-4"
        placeholder="Select"
        size="large"
      >
        <el-col :span="8"></el-col>

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
  <el-table :data="Allusers" style="width: 100%; padding-left: 20px">
    <el-table-column
      sortable
      prop="User.idUser"
      label="#"
      width="100px"
    ></el-table-column>
    <el-table-column
      sortable
      prop="email"
      label="Email"
      width="270px"
    ></el-table-column>
    <el-table-column
      sortable
      prop="User.firstName"
      label="Prénom"
      width="220px"
    ></el-table-column>
    <el-table-column
      sortable
      prop="User.lastName"
      label="Nom"
      width="220px"
    ></el-table-column>
    <el-table-column
      sortable
      prop="User.type"
      label="Type"
      width="100px"
    ></el-table-column>
    <el-table-column sortable prop="etat" label="Action" width="370px">
      <template #default="scope">
        <el-row>
          <div style="margin-right: 10px">
            <p>{{ scope.index }}</p>
            <div v-if="scope.row.state">
              <el-button
                type="warning"
                :id="scope.row.email"
                @click="clickDeactivate(scope.row.email, scope.row.state)"
                >Désactiver</el-button
              >
            </div>
            <div v-else>
              <el-button
                type="success"
                @click="clickActivate(scope.row.email, scope.row.state)"
                >Activer</el-button
              >
            </div>
          </div>
          <el-button @click="showNotifyPopUp(scope.row.email)"
            >Notifier</el-button
          >
        </el-row>
      </template>
    </el-table-column>
  </el-table>
  <br />
  <el-pagination
    @current-change="handleCurrentChange"
    :page-size="14"
    background
    layout="prev, pager, next"
    :total="totalItems"
  />
</template>
