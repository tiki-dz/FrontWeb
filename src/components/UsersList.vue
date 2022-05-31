
<script scope>

import usersService from "../services/usersService";
export default {
  name: "UsersList",
  data() {
    return {
      currentPage: 1,
      Allusers: [],
      pages: 1,
      pageSize: 14,
      totalPages : 1,
      totalItems : 0, 
      filter  : "", 
      search:  "",
      value1 : true, 
      value2 : false,
      options : [
  {
    value: '',
    label: 'Tous les utilisateur',
  },
  {
    value: 'client',
    label: 'Clients',
  },
  {
    value: 'partner',
    label: 'Partenaires',
  },
  {
    value: 'admin',
    label: 'Administrateur',
  },
]
    };
  },
  mounted: function () {
    this.handleCurrentChange(1);
  },
  methods: {
    async handleCurrentChange(pageNumber) {
      
      let users = await usersService.AllUsers({
        page: pageNumber - 1 <=  0 ? 0 : pageNumber-1,
        size: "14",
        search : this.search, 
        filter : this.filter, 
      });
      this.Allusers =     users.data.clients;
        for(var i =  0 ; i< this.Allusers.length  ; i++) {
       if(this.Allusers[i].state ==  1) {
this.Allusers[i].state  =true;
       }else {
         this.Allusers[i].state  =false;
       }
      }
      this.totalPages = users.data.totalPages;
      this.totalItems = users.data.totalItems;
    },
     async searchUser() {
      console.log('wow');
      this.currentPage = 1;
      let users = await usersService.AllUsers({
        page: 0,
        size: "14",
       search: this.search, 
        filter : this.filter, 
      });

      this.Allusers =     users.data.clients;
      for(var i =  0 ; i< this.Allusers.length  ; i++) {
       if(this.Allusers[i].state ==  1) {
this.Allusers[i].state  =true
       }else {
         this.Allusers[i].state  =false;
       }
      }
      this.totalPages = users.data.totalPages;
      this.totalItems = users.data.totalItems;
    },
    async activer(email,state)  {
 let result = await usersService.toogleAccount({
        email : email,
        state : state, 
      })
      var foundIndex = this.Allusers.findIndex(x => x.email == email);
this.Allusers[foundIndex].state = !state;
 if(result.status == 200) {
       ElNotification({
                title: "Succées",
                message: "Compte desactivé avec succées",
                type: "success",
              });
    }
    },
 async   desactiver(email,state) {
      let result = await usersService.toogleAccount({
        email : email,
        state : state, 
      })
      var foundIndex = this.Allusers.findIndex(x => x.email == email);
this.Allusers[foundIndex].state = !state;

   if(result.status == 200) {
       ElNotification({
                title: "Succées",
                message: "Compte activé avec succées",
                type: "success",
              });
    }
    },
  async   updateFilter() {
    console.log("update filter")
       let users = await usersService.AllUsers({
        page: 0,
        size: "14",
       search: this.search, 
       filter : this.filter, 
      });
            this.Allusers =     users.data.clients;
      for(var i =  0 ; i< this.Allusers.length  ; i++) {
       if(this.Allusers[i].state ==  1) {
this.Allusers[i].state  =true
       }else {
         this.Allusers[i].state  =false;
       }
      }
      this.totalPages = users.data.totalPages;
      this.totalItems = users.data.totalItems;
    }
}
};
</script>
<template>
   
    <el-row style="margin-bottom: 10px; margin-top: 10px">
      <!-- total columns is 24 -->
      <el-col :span="24">
        <el-card class="header">
          <div class="card card-frame col-4">
            <div class="card-body">
              <el-row>
                <el-col :span="6" class="path"> </el-col>
                <el-col :span="12">
                  <el-input
                    v-model="search"
                    placeholder="Chercher un email de l'utilisateur">
                    <template #prefix>
                      <el-icon class="el-input__icon"
                        ><i class="fa fa-search"></i
                      ></el-icon>
                    </template>
                  </el-input>
                </el-col>
                <el-col :span="4">
                  <button type="button" id="add" @click="searchUser">
                    Search for a user
                  </button></el-col
                >
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <br>

    <el-row justify="start">
<el-col :span="4" :offset="1" >
                  <p>     Filtrer les utilisateurs</p>
        </el-col>

        <el-col :span="10" >
            <el-select :change="updateFilter"  v-model="filter" style="margin: 0px ; padding : 0px" class="m-4" placeholder="Select" size="large" >
                    <el-col :span="8" ></el-col>  

    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    
    />
  </el-select>
        </el-col>
    </el-row>
        <br>
    <el-table :data="Allusers" style="width: 100%;margin-left:20px" >
      <el-table-column sortable prop="User.idUser" label="#" width="100px"></el-table-column>
      <el-table-column  sortable prop="email" label="Email" width="270px"></el-table-column>
      <el-table-column  sortable prop="User.firstName" label="Prénom" width="270px"></el-table-column>
      <el-table-column sortable prop="User.lastName" label="Nom" width="270px"></el-table-column>

        <el-table-column sortable prop="User.type" label="Type" width="270px"></el-table-column>
      <el-table-column sortable prop="etat" label="etat" width="270px"> 
        <template #default="scope">
         <p> {{scope.index}}</p>
          <div v-if="scope.row.state">
    <el-button type="warning" :id="scope.row.email" @click="activer(scope.row.email,scope.row.state)">Désactiver</el-button>
          </div>
     <div v-else>    
    <el-button type="success" @click="desactiver(scope.row.email,scope.row.state)">Activer</el-button>
    </div>
      </template>
    </el-table-column>
    </el-table>
    <br>
  <el-pagination @current-change="handleCurrentChange"  :page-size="14" background layout="prev, pager, next" :total="totalItems" />

  </template>
