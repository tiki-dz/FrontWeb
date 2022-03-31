<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>
<template>
  <el-card class="head"> </el-card>
  <el-card class="form">
    <img src="../assets/logoo.png" class="logoLogin" />
    <form action="" method="">
      <label for="email">Email</label>
      <input
        type="email"
        v-model.trim="email"
        name="email"
        id="email"
        placeholder="example@gmail.com"
      />
      <br />
      <label for="password">password</label>
      <input
        type="password"
        v-model="password"
        name="password"
        id="password"
        placeholder="*********"
      />
      <br />
      <input type="submit" value="Sign In" />
    </form>
  </el-card>
</template>

<style>
.head {
  background-color: var(--vt-c-orange);
  height: 30vh;
}
.form {
  background-color: rgba(255, 255, 255, 0.767);
  height: 70vh;
  width: 40%;
  position: relative;
  margin: 0 auto;
  top: -20vh;
  border-radius: 20px;
}
label {
  display: block;
  padding-left: 4%;
}
input {
  width: 80%;
  padding: 2%;
  margin: 1% auto;
  display: flex;
}
.logoLogin {
  width: 40%;
  height: 20%;
  margin: 0 auto;
  display: flex;
  margin-bottom: 10%;
}
</style>
