<template>
	<div id="login">
		<div id="login-wrapper">
			<p>{{ labels.headline }}</p>
			<div class="input-box">
				<input type="text" class="inputfield" id="usernameInput" placeholder="Username" v-model="userCredentials">
				<input type="password" class="inputfield passwordInput" placeholder="Password" v-model="password">
				<button type="submit" class="inputfield button" @click="sendLogin">{{ labels.button }}</button>
			</div>
		</div>
	</div>
</template>

<script>
const request = require("superagent");
const config = require("./../../config-dev.json");

export default {
	name: "login",
	data() {
		return {
			labels: {
				headline: "LOG IN TO YOUR ACCOUNT:",
				button: "LOG IN"
			},
			userCredentials: "",
			password: ""
		};
	},
	methods: {
		sendLogin() {
			const userCredentials = this.userCredentials;
			const password = this.password;

			const userData = {
				userCredentials: userCredentials,
				password: password
			}

			const loginUrl = config.routes.backendRoute + "/login";

			request.post(loginUrl)
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

			this.userCredentials = "";
			this. password = "";
		}
	}
}
</script>

<style scoped>
	body {
		background-color: #fce77d;
		font-family: "Dosis", sans-serif;
		color: #ffffff;
	}
	#login {
		display: block;
		height: 100vh;
		position: relative;
		font-size: 24px;
	}
	#login-wrapper {
		position: absolute;
		top: 30%;
		left: 35%;
		display: block;
		background-color: #f96167;
		margin: 0 auto;
		padding: 3rem;
		width: 30%;
		text-align: center;
		border-radius: 10px;
	}
	#login-wrapper p {
		color: #fce77d;
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
		color: #fce77d;
	}
	.button {
		background-color: #fce77d;
		border: none;
		transition: all 0.5s ease;
		color: #f96167;
	}
	.button:hover {
		background-color: #fef6cd;
	}
</style>
