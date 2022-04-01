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
            localStorage.setItem("LoggedUser", x);
            ElNotification({
              title: "Logged in successfully",
              message:
                "Welcome, " +
                x.firstName.toUpperCase() +
                " " +
                x.lastName +
                "!",
              type: "success",
            });
            this.$router.push("/");
          }
        } catch (error) {
          ElNotification({
            title: "Error to sign in",
            message: "Please enter valid credentials ",
            type: "error",
          });
        }
      }
      console.log(this.v$);
    },
    togglePassword() {
      const togglePassword = document.querySelector("#togglePassword");
      const password = document.querySelector("#password");

      togglePassword.addEventListener("click", function () {
        // toggle the type attribute
        const type =
          password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        // toggle the eye slash icon
        this.classList.toggle("fa-eye-slash");
      });
    },
  },
};
</script>
<template>
  <div class="transparent">
    <el-card class="head"> </el-card>
    <el-card class="form">
      <img src="../assets/logoo.png" class="logoLogin" />
      <form @submit.prevent="login">
        <label for="email">Email</label>
        <input
          type="email"
          v-model.trim="form.email"
          name="email"
          id="email"
          placeholder="example@gmail.com"
        />
        <span v-if="v$.form.email.$error">Invalid email format !</span>
        <br />
        <label for="password">Password</label>
        <input
          type="password"
          v-model="form.password"
          name="password"
          id="password"
          placeholder="*********"
        />
        <i class="far fa-eye" id="togglePassword" @click="togglePassword"></i>
        <span v-if="v$.form.password.$error">Invalid password format !</span>

        <br />
        <button class="submit">Sign in</button>
      </form>
    </el-card>
  </div>
</template>

<style scoped>
.transparent {
  overflow: hidden;
  height: 100vh;
}
.head {
  background-color: var(--vt-c-orange);
  height: 30vh;
}
.form {
  background-color: rgba(250, 246, 244, 0.884);
  height: 80vh;
  width: 40%;
  position: relative;
  margin: 0 auto;
  top: -20vh;
  border-radius: 20px;
  padding: 1%;
  overflow: hidden;
  z-index: 4;
}
label {
  display: block;
  padding-left: 8%;
}
input {
  width: 80%;
  padding: 3%;
  padding-left: 8%;
  margin: 1% auto;
  border: none;
  display: block;
  border-radius: 10px;
  box-shadow: 2px 2px 6px rgb(167, 167, 167);
  outline: none;
}
.submit {
  padding: 3%;
  display: block;
  border-radius: 10px;
  margin: 1% auto;
  border: none;
  box-shadow: 2px 2px 6px rgb(167, 167, 167);
  text-align: center;
  background: var(--vt-c-orange);
  color: white;
  font-size: 13pt;
  width: 60%;
  cursor: pointer;
  position: relative;
  user-select: none;
  transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s;
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
  box-shadow: 0 0 50px 20px rgb(184, 184, 184);
}
.submit:active:after {
  box-shadow: 0 0 0 0 rgb(184, 184, 184);
  border-radius: 10px;
  left: 0;
  top: 0;
  opacity: 1;
  transition: 0s;
}

.logoLogin {
  width: 35%;
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
#togglePassword {
  margin-top: -13%;
  padding: 3%;
  right: 20%;
  cursor: pointer;
  float: right;
  position: relative;
}
</style>
