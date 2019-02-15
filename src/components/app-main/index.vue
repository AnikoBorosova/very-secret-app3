<template>
  <div id="app">
    <app-header></app-header>

    <!-- oooooooooooooooooooooooooooooooo -->
    <div class="spend-input-wrapper">
      <form action placeholder="amount spent">
        <input type="text" v-model="amount" class="form-item inputfield">
        
        <select name="categories" class="form-item inputfield">
          <option value="Select">Select</option>
          <option value="Flat">Flat</option>
          <option value="Food">Food</option>
          <option value="Public transport">Public transport</option>
          <option value="Clothes">Clothes</option>
          <option value="Cosmetics">Cosmetics</option>
          <option value="Cleaning porducts">Cleaning porducts</option>
          <option value="Home">Home</option>
          <option value="Gifts">Gifts</option>
          <option value="Culture">Culture</option>
          <option value="Sport">Sport</option>
        </select>
        
        <button @click="submit" class="form-item submit-button">SUBMIT</button>
      </form>
    </div>

    <!--oooooooooooooooooooooooooooooooooo   -->
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
import appHeader from "@/components/header";
const request = require("superagent");
const config = require("./../../config-dev.json");

export default {
  name: 'App',
  data() {
    return {
      amount: "",
      amounts: [],
      totalAmount: 0
    };
  },
  components: {
    appHeader
  },
  methods: {
    submit() {
      console.log("SUBMIT")
      const expensesUrl = config.routes.backendRoute + "/expenses";
      const userExpenses = this.amount;

      if (this.amount !== "" && this.amount !== 0) {
        this.amounts.push({
          amountText: this.amount
        });

        request.post("http://localhost:4001/expenses")
          //.withCredentials()
          .set("Content-Type", "application/json")
          .send({
            userExpenses
          })
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
    deleteAmount(index, amountText) {
      let deleteAmount = parseInt(amountText);
      this.totalAmount -= deleteAmount;
      this.amounts.splice(index, 1);
    }
  }
}
</script>

<style>
#app {
  font-family: "Dosis", sans-serif;
}
.spend-input-wrapper {
  border: 1px solid black;
  display: block;
  padding: 3rem;
  margin: 2rem 3rem;
  width: 30%;
  text-align: center;
}
.form-item {
  display: block;
}
.inputfield {
  border: 1px solid #f96167;
  border-radius: 5px;
  display: block;
  width: 100%;
  height: 3.5rem;
  line-height: 2rem;
  margin: 1rem auto;
  padding-left: 1rem;
  vertical-align: middle;
  color: #f96167;
}
.inputfield option {
  padding-bottom: 1rem;
}
.submit-button {
  background-color: #f96167;
  border: none;
  transition: all 0.5s ease;
  color: #fce77d;
}
.submit-button:hover {
  background-color: #fce77d;
  color: #f96167;
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
  width: 300px;
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
  width: 300px;
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
