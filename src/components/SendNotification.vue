

<template>
      <el-row style="margin-bottom: 10px; margin-top: 10px">
      <!-- total columns is 24 -->
      <el-col :span="24">
        <el-card class="header">
          <div class="card card-frame col-4">
            <div class="card-body">
              <el-row>
                <el-col :span="8" class="path">
                  <el-breadcrumb separator="/">
                    <el-breadcrumb-item style="color: aliceblue"
                      >Notification</el-breadcrumb-item
                    >
                    <el-breadcrumb-item
                      ><a href="/home/notification/" style="color: aliceblue"
                        >Envoyer une notification</a
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
<h1>Notification</h1>

    <el-card style="margin: 20px; border-radius: 20px">

    <template #header>
      <div class="card-header">
        <span>Envoyer une notification à tous les utilisateurs</span>
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

    <el-form-item label="Titre" prop="titre">
      <el-input placeholder="Entrer le titre" v-model="ruleForm.titre"  style="margin-left:25px" />
    </el-form-item>
       <el-form-item label="Description" prop="description">
      <el-input placeholder="Entrer le contenue" v-model="ruleForm.description"  style="margin-left:25px"  type="textarea"/>
    </el-form-item>
    <el-form-item>
      <br>
      <br>
      <br>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Envoyer</el-button
      >
    </el-form-item>
  </el-form>
  </el-card>
</template>

<style scoped></style>
<script lang="ts" setup>
import userService from "../services/usersService";
import { reactive, ref } from 'vue'
import { ElNotification, FormInstance, FormRules } from 'element-plus'
import { ElLoading } from "element-plus";
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  titre: '',
description :'', 
})

const rules = reactive<FormRules>({
 titre: [
    { required: true, message: 'Vous devez entrer le titre' },

  ],
   description: [
    { required: true, message: 'Vous devez entrer la description' },

  ],
 

})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log(ruleForm);
      console.log(  {
  titre: ruleForm.titre,
  description: ruleForm.description,

});
const loading = ElLoading.service({
        lock: true,
        text: "Chargement",
        background: "rgba(0, 0, 0, 0.7)",
      });
try {


var resp = await  userService.sendNotifToAll(
      {
  title: ruleForm.titre,
  body: ruleForm.description,
  topic: 'all', 
});


loading.close(); 
    if(resp.status == 200) {
       ElNotification({
                title: "Succées",
                message: "Notification envoyer avec succés",
                type: "success",
              });
        ruleForm.titre = "";
  ruleForm.description = ""; 
    }
      
}catch(e) {

      ElNotification({
                title: "Erreur",
                message: "Erreur",
                type: "error",
              });

    } 
}   
  })
}
</script>
