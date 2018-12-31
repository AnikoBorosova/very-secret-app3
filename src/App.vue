<template>
  <div id="app">
    <v-form ref="form" class="ml-5">
          <v-text-field label="amount spent" v-model="amount"></v-text-field>
          <v-btn @click="submit" normal color="#26a69a" v-on:keyup.enter="submit()">submit</v-btn>
    </v-form>

    <ul class="mt-5 ml-5">
      <li v-for="(amount, index) in amounts">
        <span class="subheading">{{ amount.amountText }} HUF</span>
        <v-btn @click="deleteAmount(index,amount.amountText)" small color="b2dfdb">delete</v-btn>
      </li>
    </ul>

    <div class="total ml-5">
      <p>TOTAL AMOUNT:</p>
      <p>{{ totalAmount }} HUF</p>
    </div>
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
      amounts: [],
      totalAmount: 0
    };
  },
  methods: {
    submit() {
      debugger;
      const expensesUrl = config.routes.backendRoute + "/expenses";
      const userExpenses = this.amount;

      if (this.amount !== "" && this.amount !== 0) {
        this.amounts.push({
          amountText: this.amount
        });

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

        let convertToNum = parseInt(this.amount);
        this.totalAmount += convertToNum;

        this.amount = "";
        return;

      }
    },
    deleteAmount(index,amountText) {
      let deleteAmount = parseInt(amountText);
      this.totalAmount -= deleteAmount;
      this.amounts.splice(index, 1);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
.v-form {
  width: 300px;
  text-align: center;
}
.v-form:after {
  display: block;
  content: "";
  background-color: #000000;
  height: 1px;
  width: 25vw;
  margin: 3rem auto;
}
.total {
  width: 300px;
  text-align: center;
}
.total:before {
  display: block;
  content: "";
  background-color: #000000;
  height: 1px;
  width: 25vw;
  margin: 3rem auto;
}
.total p {
  font-size: 20px;
}
li {
  list-style-type: none;
}
.subheading {
      display: inline-flex;
      width: 100px;
    }
</style>
