<template>
	<div id="app">
		<app-header></app-header>
	
		<div class="spend-input-wrapper">
			<form action placeholder="amount spent">
				<input type="text" v-model="amount" class="form-item inputfield">

				<!-- convert to vue select element -->
				<!-- <select name="categories" class="form-item inputfield">
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
				</select> -->
			
				<button @click="submit" class="form-item submit-button" v-on:keyup.enter="submit()">SUBMIT</button>
			</form>

			<ul>
				<li v-for="(amount, index) in amounts">
					<span class="subheading">{{ amount.amountText }} HUF</span>
					<button @click="deleteAmount(index,amount.amountText)" color="b2dfdb">DELETE</button>
				</li>
			</ul>

			<div class="total">
				<p>TOTAL AMOUNT:<span class="divider"></span>{{ totalAmount }} HUF</p>
			</div>
		</div>

		<!-- <v-form ref="form" class="ml-5">
			<v-text-field label="amount spent" v-model="amount"></v-text-field>
			<v-btn @click="submit" normal color="#26a69a" v-on:keyup.enter="submit()">submit</v-btn>
		</v-form> -->

		<!--  <ul class="mt-5 ml-5">
			<li v-for="(amount, index) in amounts">
				<span class="subheading">{{ amount.amountText }} HUF</span>
				<v-btn @click="deleteAmount(index,amount.amountText)" small color="b2dfdb">delete</v-btn>
			</li>
		</ul> -->

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
			const expensesUrl = config.routes.backendRoute + "/expenses";
			const userExpenses = this.amount;

			if (this.amount !== "" && this.amount !== 0) {
				this.amounts.push({
					amountText: this.amount
				});

				/*request.post("http://localhost:4001/expenses")
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
					})*/

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
	body {
		margin: 0; 
	}
	#app {
		font-family: "Dosis", sans-serif;
	}
	.spend-input-wrapper {
		display: block;
		padding: 3rem;
		margin: 2rem 3rem;
		width: 30%;
		text-align: center;
	}
	.form-item {
		display: block;
	}
	.inputfield,
	.inputfield select {
		font-family: "Dosis", sans-serif;
		font-size: 1.5rem;
		border: 1px solid #f96167;
		border-radius: 10px;
		display: block;
		width: 80%;
		height: 2rem;
		line-height: 2rem;
		margin: 1rem auto;
		padding: 1rem;
		vertical-align: middle;
		color: #f96167;
	}
	.inputfield option {
		cursor: pointer;
		padding: 1rem;
	}
	.submit-button {
		font-size: 1.5rem;
		background-color: #f96167;
		transition: all 0.5s ease;
		color: #fce77d;
		padding: 1rem 3rem;
		margin: 2rem auto;
		border: none;
		border-radius: 10px;
	}
	.submit-button:hover {
		background-color: #fce77d;
		color: #f96167;
	}
	.v-form {
		width: 300px;
		text-align: center;
	}
	.total {
		width: 100%;
		text-align: center;
		font-size: 1.3rem;
		color: #f96167;
	}
	.divider {
		display: inline-block;
		width: 15px;
	}
	ul {
		padding-left: 0;
	}
	li {
		list-style-type: none;
		font-size: 1.3rem;
		padding-bottom: 1rem;
	}
	.subheading {
		display: inline-flex;
		width: 100px;
	}
</style>
