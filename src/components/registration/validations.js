const request = require("superagent");
const config = require("./../../config-dev.json");

function checkDuplicateUsername (username) {

	const checkUsernameUrl = config.routes.backendRoute + "/register/checkDuplicateUsername";

	request.post(checkUsernameUrl)
		//.withCredentials()
		.set("Content-Type", "application/json")
		.send({
			username
		})
		.end(function(err, res) {

			// general error
			if (err) {
				console.error("ERROR: ", res.body);
				return "Something went wrong";
			}

			const response = res.body;

			// user does not exist
			if (!response.userExists) {
				return;
			}

			// username exists
			return true;
		});
}

function validateEmail (email) {

	//const email = email;
	const validEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const validEmail = validEmailRegex.test(email);  // Returns true / false

	if (!validEmail) {
		return;
	}

	return validEmail;   // Returns true / false
}

function checkDuplicateEmail (email) {

	const checkEmailUrl = config.routes.backendRoute + "/registration/checkDuplicateEmail";

	request.post(checkEmailUrl)
		//.withCredentials
		.set("Content-Type", "application/json")
		.send({
			email
		})
		.end(function(err, res) {

			//general error
			if (err) {
				console.log("ERROR: ", res.body);
				return "Something went wrong";
			}

			const response = res.body;

			// email does not exist
			if (!response.emailExists) {
				return;
			}

			// email exists
			return true;
		});
}

function validatePassword (password) {

}


function checkPasswordsMatch (password, confirmPassword) {

}


module.exports = {
	checkDuplicateUsername,
	validateEmail,
	checkDuplicateEmail,
	validatePassword,
	checkPasswordsMatch
};