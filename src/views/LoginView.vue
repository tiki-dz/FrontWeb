<script>
import authService from "../services/authService";
import useValidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { ElNotification } from "element-plus/es";
import("element-plus/es/components/notification/style/css");
export default {
  data() {
    return {
      v$: useValidate(),
      form: {
        email: "",
        password: "",
      },
    };
  },
  validations() {
    return {
      form: {
        email: { required, email },
        password: { required, minLength: minLength(8) },
      },
    };
  },
  methods: {
    async login() {
      this.v$.$validate();
      if (this.v$.$error) {
        ElNotification({
          title: "Warning",
          message: "Wrong credentials",
          type: "error",
        });
      } else {
        try {
          const account = await authService.Login({
            email: this.form.email.toLowerCase(),
            password: this.form.password,
          });
          console.log(account.data);
          if (account.data.success == false) {
            ElNotification({
              title: "Error",
              message: "Error to sign in :" + account.data.message,
              type: "error",
            });
          } else {
            let x = account.data.data.token;
            let user = account.data.data.data.User;
            localStorage.setItem("LoggedUser", x);
            ElNotification({
              title: "Logged in successfully",
              message:
                "Welcome, " +
                user.firstName.toUpperCase() +
                " " +
                user.lastName +
                "!",
              type: "success",
            });
            this.$router.push("/");
          }
        } catch (error) {
          ElNotification({
            title: "Failed to sign in",
            message: "Server error ",
            type: "warning",
          });
        }
      }
      console.log(this.v$);
    },
  },
};
</script>
<template>
  <div class="body">
    <el-row>
      <el-col :span="8"></el-col>
      <el-col :span="8" class="right_col">
        <div class="transparent">
          <el-card class="form">
            <img src="../assets/logoo.png" class="logoLogin" />
            <p class="welcome">Welcome back, dear ADMIN!</p>
            <br />
            <form @submit.prevent="login">
              <el-input
                type="email"
                size="large"
                v-model.trim="form.email"
                name="email"
                id="email"
                placeholder="Email"
              />
              <span v-if="v$.form.email.$error">Invalid email format !</span>
              <br />
              <el-input
                size="large"
                type="password"
                v-model="form.password"
                name="password"
                id="password"
                placeholder="Password"
                show-password
              />
              <span v-if="v$.form.password.$error"
                >Invalid password format !</span
              >

              <br />
              <button class="submit">Sign in</button>
            </form>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.transparent {
  display: table-cell;
  vertical-align: middle;
  margin: 2%;
  z-index: 4;
}
.form {
  background-color: rgba(32, 31, 31, 0.973);
  height: 80vh;
  display: table-cell;
  vertical-align: middle;
  margin: 0 auto;
  box-shadow: 0px 0px 6px 1px rgb(57, 56, 56);

  border-radius: 20px;
  padding: 1%;
  border: none;
  overflow: hidden;
  z-index: 4;
}
.el-input {
  width: 70%;
  margin: 1% auto;
  border: none;
  display: block;
  --el-input-focus-border-color: rgba(0, 0, 0, 0);
  box-shadow: 2px 2px 6px rgb(93, 93, 93);
}
.submit {
  display: block;
  border-radius: 5px;
  margin: 1% auto;
  border: none;
  box-shadow: 2px 2px 6px rgb(90, 90, 90);
  text-align: center;
  background: rgb(224, 112, 6);
  color: white;
  font-size: 13pt;
  cursor: pointer;
  position: relative;
  user-select: none;
  transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s;
  width: 45%;
  padding: 3%;
}
.submit:hover {
  transition-duration: 0.1s;
  opacity: 0.9;
}
.submit:active {
  top: 1px;
}
.submit:after {
  content: "";
  position: absolute;
  border-radius: 10px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.5s;
  box-shadow: 0 0 50px 20px rgb(62, 60, 60);
}
.submit:active:after {
  box-shadow: 0 0 0 0 rgb(88, 86, 86);
  border-radius: 10px;
  left: 0;
  top: 0;
  opacity: 1;
  transition: 0s;
}

.logoLogin {
  width: 25%;
  height: 20%;
  margin: 0 auto;
  display: flex;
  margin-bottom: 10%;
}
span {
  color: red;
  font-size: 11px;
  padding-right: 10%;
  display: block;
  text-align: right;
  margin-top: 0px;
}
.welcome {
  font-size: 22px;
  text-align: center;
  color: white;
}
.body {
  background-image: url("../assets/back4.jpg");
  background-size: cover;
  min-height: 100vh;
  background-repeat: no-repeat;
  z-index: 1;
}
.el-row {
  background-color: rgba(153, 152, 132, 0.269);
  min-height: 100vh;
  backdrop-filter: blur(2px);
}
.right_col {
  display: table;
}
</style>
