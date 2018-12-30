<template>
  <div id="app">
    <v-form ref="form" class="ml-5">
          <v-text-field label="amount spent" v-model="amount"></v-text-field>
         
          <v-btn @click="submit">submit</v-btn>
    </v-form>
  </div>
</template>

<script>
const request = require("superagent");
const config = require("./config-dev.json");

export default {
  name: 'App',
  data() {
    return {
      amount: "",
    };
  },
  methods: {
    submit() {
      debugger;
      const expensesUrl = config.routes.backendRoute + "/expenses";
      const userExpenses = this.amount;

      request.post(expensesUrl)
          .withCredentials()
          .set("Content-Type", "application/json")
          .send(userExpenses)
          .end((err, res) => {

            if (err) {
              console.log(err);
              return;
            }

            console.log(res.body);

          })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.v-form {
  width: 300px;
}
</style>
