

<template>
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
                      >Promotions</el-breadcrumb-item
                    >
                    <el-breadcrumb-item
                      ><a href="/home/AddCodePromo" style="color: aliceblue"
                        >Ajouter une promotion</a
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
        <span><h1> Ajouter une promotion</h1></span>
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

    <el-form-item label="Nom" prop="name">
      <el-input placeholder="Entrer le nom du code promo" v-model="ruleForm.name"  style="margin-left:25px" />
    </el-form-item>
     <el-form-item label="Pourcentage de remise" prop="value"       >
       <el-input-number
v-model="ruleForm.value"
    :min="5"
    :max="100"
    :step="5"
    controls-position="right"
  
  />
    </el-form-item>
   <el-form-item label="Nombre d'utilisation" prop="value"       >
       <el-input-number
v-model="ruleForm.use"
    :min="1"
    :max="3"
    :step="1"
    controls-position="right"
  
  />
    </el-form-item>

        <el-form-item label="Date début" prop="startTime">
          <el-date-picker
       
              format="YYYY/MM/DD"
           value-format="YYYY-MM-DD"
            v-model="ruleForm.startTime"

            type="date"
            placeholder="Choisir la date"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="Heure début" prop="startHour">
          <el-time-picker
            v-model="ruleForm.startHour"
            placeholder="Choisir l'heure"
            style="width: 100%"
            format="HH:mm"
           value-format="HH:mm:ss"
          />
        </el-form-item>
        <el-form-item label="Date fin" prop="endTime">
          <el-date-picker
            format="YYYY/MM/DD"
           value-format="YYYY-MM-DD"
            v-model="ruleForm.endTime"
            type="date"
            placeholder="Choisir la date"
            style="width: 100%"
          />
        </el-form-item>
      <el-col class="text-center" :span="2">
      </el-col>
        <el-form-item  label="Heure fin" prop="endHour">
          <el-time-picker
            v-model="ruleForm.endHour"
            placeholder="Choisir l'heure"
            style="width: 100%"
                   format="HH:mm"
           value-format="HH:mm:ss"
          />
        </el-form-item>
    <el-form-item>
      <br>
      <br>
      <br>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Créer</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Réinitialiser</el-button>
    </el-form-item>
  </el-form>
  </el-card>
   </el-scrollbar>
      </el-col>
    </el-row>
</template>
<style scoped></style>
<script lang="ts" setup>
import codeService from "../services/codeService";
import { reactive, ref } from 'vue'
import { ElNotification, FormInstance, FormRules } from 'element-plus'
import "element-plus/es/components/loading/style/css";
import { ElLoading } from "element-plus";
import { Loading } from "element-plus/es/components/loading/src/service";
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  name: '',
  value: '5',
  startTime: '',
  startHour: '',
  endTime: '',
  endHour: '',
  use: '', 
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Vous devez entrer le nom' },

  ],
  value: [
    {
      required: true,
      message: 'Vous devez entrer la valeur',
    },
    { type: 'number', message: 'value must be a number' },
  ],
  use: [
    {
      required: true,
      message: 'Vous devez entrer la valeur',
    },
    { type: 'number', message: 'value must be a number' },
  ],
  startTime: [
    {
      required: true,
      message: 'Vous devez entrer la date de début',

    },
  ],
  startHour: [
    {
  
      required: true,
      message: 'Vous devez entrer l"heure de début',

    },
  ],
   endTime: [
    {
      required: true,
      message: 'Vous devez entrer la date de fin',

    },
  ],
  endHour: [
    {
      required: true,
      message: 'Vous devez entrer l"heure de la fin',

    },
  ],



})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log(ruleForm);
      console.log(  {
  name: ruleForm.name,
  value: ruleForm.value,
  startTime: ruleForm.startTime, 
 endTime: ruleForm.endTime , 
 startHour : ruleForm.startHour,
 endHour : ruleForm.endHour,
});
let loading
try {
   loading = ElLoading.service({
        lock: true,
        text: "Chargement",
        background: "rgba(0, 0, 0, 0.7)",
      });
      var resp = await  codeService.CreateCodePromo(
            {
        name: ruleForm.name,
        value: ruleForm.value,
        use : ruleForm.use,
        startTime: ruleForm.startTime + " " +  ruleForm.startHour,
      endTime: ruleForm.endTime + " " +  ruleForm.endHour,

      });
      loading.close()

    if(resp.status == 200) {
     location.reload()  
     ElNotification({
                title: "Succées",
                message: "Code promo ajouté avec succés",
                type: "success",
              });
    }
      
}catch(e) {
  loading.close()
      ElNotification({
                title: "Erreur",
                message: "Ce Code existe déja",
                type: "error",
              });
 if(resp.status == 409) {
          ElNotification({
                title: "Erreur",
                message: "Ce Code existe déja",
                type: "error",
              });
    }
    else {
         ElNotification({
                title: "Erreur",
                message: "Erreur",
                type: "error",
              });
 
    }
    } 
}
    
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
