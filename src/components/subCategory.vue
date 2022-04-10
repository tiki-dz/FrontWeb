
<!--
    <el-form-item label="idSubCategory" :label-width="formLabelWidth">
          <el-input v-model="form.idSubCategory" autocomplete="off" />
        </el-form-item>
        <el-form-item label="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="description" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off" />
        </el-form-item>
        -->

        <template>
  <!-- header -->
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Categories</span>
        <el-button
          id="btnAjouter"
          color="#fd7d1bdc"
          style="color: white"
          round
          @click="dialogFormVisible = true"
          >Ajouter</el-button
        >
      </div>
    </template>
    <!--table-->
     <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="Id" prop="id" />
      <el-table-column label="icon" prop="icon" />

      <el-table-column label="name" prop="name" />
      <el-table-column label="description" prop="descriotion" />

      <el-table-column align="right">
        <template #header>
          <el-input
            v-model="search"
            size="small"
            placeholder="Chercher categorie existante"
          />
        </template>
        <template #default="scope">
           <el-button
            size="small"
           
          
            >Sous categories</el-button
          >
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
           >Modifier</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Supprimer</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- Form -->

    <el-dialog v-model="dialogFormVisible" title="Ctegories">
      <el-form :model="form">
        <el-form-item label="idCategory" :label-width="formLabelWidth">
          <el-input v-model="form.idCategory" autocomplete="off" />
        </el-form-item>
        <el-form-item label="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="description" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off" />
        </el-form-item>
        <el-form-item label="icon" :label-width="formLabelWidth">
          <el-input v-model="form.icon" autocomplete="off" />
        </el-form-item>
        
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="dialogFormVisible = false"
            color="#fd7d1bdc"
            style="color: white"
            >Ajouter</el-button
          >
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script >
import { ref } from "vue";

//const dialogFormVisible = ref(false);
//const formLabelWidth = "140px";
export default {
  name:"AddCategorie",
  data() {
    return {
form: {
  idCategory: "",
  name: "",
  description: "",
  icon: "",
  idSubCategory: "",
},
dialogFormVisible :ref(false),
formLabelWidth : "140px",


 
 User : [
  {
    id: '2016-05-03',
    icon: 'Tom',
    name: 'No. 189, Grove St, Los Angeles',
    description: 'No. 189, Grove St, Los Angeles',

  },
   {
    id: '2016-05-03',
    icon: 'Tom',
    name: 'No. 189, Grove St, Los Angeles',
    description: 'No. 189, Grove St, Los Angeles',

  },
   {
    id: '2016-05-03',
    icon: 'Tom',
    name: 'No. 189, Grove St, Los Angeles',
    description: 'No. 189, Grove St, Los Angeles',

  },
  {
    date: '2016-05-01',
    name: 'Jessy',
    address: 'No. 189, Grove St, Los Angeles',
  },
],
search :ref(''),}},
methods:{
handleEdit ( index, row){
  console.log(index, row)
},
 handleDelete (index, row) {
  console.log(index, row)
},
 
}}
 
</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
#btnAjouter {
  margin-left: 80%;
}
</style>
