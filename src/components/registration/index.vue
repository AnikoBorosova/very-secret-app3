<template>
  <div id="registration">
    <div id="register-wrapper">
      <p>{{ labels.headline }}</p>
      <div class="input-box">
        <input type="text" class="inputfield" id="usernameInput" placeholder="Username" v-model="username">
        <input type="text" class="inputfield" id="emailInput" placeholder="Email" v-model="email">
        <input type="password" class="inputfield passwordInput" placeholder="Password" v-model="password">
        <input type="password" class="inputfield passwordInput" placeholder="Confirm password" v-model="confirmPassword">
        <button type="submit" class="inputfield button" @click="sendRegistration">{{ labels.button }}</button>
      </div>
    </div>
  </div>
</template>

<script>
const request = require("superagent");
const config = require("./../../config-dev.json");

export default {
  name: 'registration',
  data() {
    return {
      labels: {
        headline: "CREATE YOUR ACCOUNT:",
        button: "REGISTER"
      },
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    sendRegistration() {
      const userName = this.username;
      const email = this.email;
      const password = this.password;
      const confirmPassword = this.confirmPassword;

      const userData = {
        userName: userName,
        email: email,
        password: password,
        confirmPassword: confirmPassword
      }

      const registerUrl = config.routes.backendRoute + "/registration";

      request.post(registerUrl)
            .withCredentials()
            .set("Content-Type", "application/json")
            .send(userData)
            .end((err, res) => {

              if (err) {
                console.log(err);
                return;
              }

              console.log(res.body);

            })

      this.username = "";
      this.email = "";
      this. password = "";
      this.confirmPassword = "";
    }
  }
}
</script>

<style>
  body {
    background-color: #3b4560;
    font-family: "Dosis", sans-serif;
    color: #ffffff;
  }
  #registration {
    display: block;
    height: 100vh;
    position: relative;
    font-size: 24px;
  }
  #register-wrapper {
    position: absolute;
    top: 30%;
    left: 35%;
    display: block;
    background-color: #23c685;
    margin: 0 auto;
    padding: 3rem;
    width: 30%;
    text-align: center;
    border-radius: 10px;
  }
  .input-box {
    display: block;
    width: 100%;
    margin: 0 auto;
  }
  .inputfield {
    border: 1px solid #ffffff;
    border-radius: 5px;
    display: block;
    width: 100%;
    height: 3.5rem;
    line-height: 2rem;
    margin: 1rem auto;
    padding-left: 1rem;
    vertical-align: middle;
  }
  .button {
    background-color: #3b4560;
    border: none;
    transition: all 0.5s ease;
  }
  .button:hover {
   background-color: #717fa8;

  }

</style>
