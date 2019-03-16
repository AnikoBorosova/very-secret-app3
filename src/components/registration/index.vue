<template>
	<div id="registration">
		<div id="register-wrapper">
			<p>{{ labels.headline }}</p>
			<div class="input-box">
				<input type="text" class="input-register" id="usernameInput" placeholder="Username" v-model="username">
				<p v-if="duplicateUsername">This username is already registered, please choose a different one!</p>

				<input type="text" class="input-register" id="emailInput" placeholder="Email" v-model="email">
				<p v-if="invalidEmail">The email format is invalid!</p>
				<p v-if="duplicateEmail">This email address is already registered. If you own it, please log in to continue!</p>

				<input type="password" class="input-register passwordInput" placeholder="Password" v-model="password">
				<p v-if="invalidPassword">Password must contain at least eight characters, one lowecase letter, one uppercase letter and one number!</p>

				<input type="password" class="input-register passwordInput" placeholder="Confirm password" v-model="confirmPassword">
				<p v-if="differentPassword">Passwords must be the same!</p>

				<button type="submit" class="input-register button-register" @click="sendRegistration">{{ labels.button }}</button>
			</div>
		</div>
	</div>
</template>

<script>
const request = require("superagent");
const config = require("./../../config-dev.json");
const validations = require("./validations.js");

export default {
	name: "registration",
	data() {
		return {
			labels: {
				headline: "CREATE YOUR ACCOUNT:",
				button: "REGISTER"
			},
			username: "",
			email: "",
			password: "",
			confirmPassword: "",

			duplicateUsername: false,			// USING OF VUEX ??????
			invalidEmail: false,
			duplicateEmail: false,
			invalidPassword: false,
			differentPassword: false
		};
	},
	methods: {
		sendRegistration() {
			const userName = this.username;
			const email = this.email;
			const password = this.password;
			const confirmPassword = this.confirmPassword;

			if (!userName || !email || !password || !confirmPassword) {
				return;
			}

			// Check username duplication
			const isDuplicateUsername = validations.checkDuplicateUsername(password);

			if (isDuplicateUsername) {
				return this.duplicateUsername = true;
			}

			// Check if email is valid
			const validEmail = validations.validateEmail(email);

			if (!validEmail) {
				return this.invalidEmail = true;
			};

			// Check email duplication
			const isDuplicateEmail = validations.checkDuplicateEmail(email);

			if (isDuplicateEmail) {
				return this.duplicateEmail = true;
			}

			// Check if password is valid
			const validPwd = validations.validatePassword(password);

			if (!validPwd) {
				return this.invalidPassword = true;
			}

			// Check if passwords are the same
			const matchingPwd = validations.checkPasswordsMatch(password,confirmPassword);

			if (!matchingPwd) {
				return this.differentPassword = true;
			}

			let userData = {};
			//check all criteria
			if (!isDuplicateUsername && validEmail && !isDuplicateEmail && validPwd && matchingPwd) {
				userData = {
					userName: userName,
					email: email,
					password: password,
					confirmPassword: confirmPassword
				};

				this.duplicateUsername = false;
				this.invalidEmail = false;
				this.duplicateEmail = false;
				this.invalidPassword = false;
				this.differentPassword = false;
			}

			const registerUrl = config.routes.backendRoute + "/registration";

			request.post(registerUrl)
				//.withCredentials()
				.set("Content-Type", "application/json")
				.send(userData)
				.end((err, res) => {

					if (err) {
						console.log("ERROR while sending register data", err);
						return;
					}

					console.log("AAAAAAAAAAAAAAAAAAAA", res.body);

				});

			this.username = "";
			this.email = "";
			this. password = "";
			this.confirmPassword = "";
		}
	}
};
</script>

<style>
	body {
		margin: 0;
		padding: 0;
		background-color: #3b4560;
		font-family: "Dosis", sans-serif;
		color: #ffffff;
	}
	#registration {
		font-family: "Dosis", sans-serif;
		display: block;
		height: 100vh;
		position: relative;
		font-size: 24px;
	}
	#register-wrapper {
		position: absolute;
		top: 25%;
		left: 33%;
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
	.input-register {
		font-family: "Dosis", sans-serif;
		border: 1px solid #ffffff;
		border-radius: 5px;
		display: block;
		width: 90%;
		height: 3rem;
		font-size: 1.5rem;
		line-height: 2rem;
		margin: 1rem auto;
		padding-left: 1rem;
		vertical-align: middle;
		color: #ffffff;
		background-color: transparent;
	}
	.input-box p {
		font-size: 1.3rem;
		text-align: left;
		margin: 0 1rem; 
	}
	.button-register {
		padding: 0;
		width: 93%;
		height: 3.5rem;
		background-color: #3b4560;
		border: none;
		transition: all 0.5s ease;
	}
	.button-register:hover {
		cursor: pointer;
		background-color: #717fa8;

	}
</style>
