<template>
  <el-scrollbar max-height="100vh">
    <h1 style="font-size: 38px; padding-top: 10px">Acceuil</h1>
    <br />
    <div>
      <BarChart></BarChart>
      <div style="display: block">
        <line-chart-purchase></line-chart-purchase>
      </div>

      <pie-chart></pie-chart>
    </div>
  </el-scrollbar>
</template>
