<script scope>
export default {
  name: "ItemView",
  data() {
    return {};
  },

  methods: {},
};
</script>

<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>Categories</span>
        <router-link to="/home/AddCategory">
           <span id="add">Ajouter</span>
        </router-link>
      </div>
    </template>

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </el-card>
</template>

<style scoped>
#add{
  margin-left: 80%;
  color: #fd7d1bdc;
}
</style>
