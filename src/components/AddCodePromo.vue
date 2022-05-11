

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>Ajouter un code promo</span>
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
          format="YYYY-MM-DD"
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
          />
        </el-form-item>
        <el-form-item label="Date fin" prop="endTime">
          <el-date-picker
                   format="YYYY-MM-DD"
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
          />
        </el-form-item>
    <el-form-item>
      <br>
      <br>
      <br>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Créer</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Supprimer</el-button>
    </el-form-item>
  </el-form>
  </el-card>
</template>

<style scoped></style>
<script lang="ts" setup>
import codeService from "../services/codeService";
import { reactive, ref } from 'vue'
import { ElNotification, FormInstance, FormRules } from 'element-plus'

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
      type: 'date',
      required: true,
      message: 'Vous devez entrer le nombre d"utilisation',

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
  startTime: "2022-12-12 12:00",
 endTime: "2022-12-14 12:00",
});
try {
var resp = await  codeService.CreateCodePromo(
      {
  name: ruleForm.name,
  value: ruleForm.value,
  use : ruleForm.use,
  startTime: "2022-12-12 12:00",
 endTime: "2022-12-14 12:00",

});

    if(resp.status == 200) {
       ElNotification({
                title: "Succées",
                message: "Code promo ajouté avec succés",
                type: "success",
              });
    }
      
}catch(e) {
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
