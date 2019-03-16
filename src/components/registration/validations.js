const request = require("superagent");
const config = require("./../../config-dev.json");

function checkDuplicateUsername (username) {

	const checkUsernameUrl = config.routes.backendRoute + "/registration/checkDuplicateUsername";

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

	return validEmail;   // Returns true
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

function lowerCasePwd (password) {
	const lowerCaseChar = /[a-z]/g;

	const containsLowerCase = lowerCaseChar.test(password);

	if (!containsLowerCase) {
		return false;
	}

	return containsLowerCase;
}

function upperCasePwd ( password) {
	const upperCaseChar = /[A-Z]/g;

	const containsUpperCase = upperCaseChar.test(password);

	if (!containsUpperCase) {
		return false;
	}

	return containsUpperCase;
}

function numberPwd (password) {
	const numbers = /[0-9]/g;

	const containsNumbers = numbers.test(password);

	if (!containsNumbers) {
		return false;
	}

	return containsNumbers;
}

function longPwd (password) {
	const longEnough = password.length >= 8;

	if (!longEnough) {
		return false;
	}

	return longEnough;
}

function checkPasswordsMatch (password, confirmPassword) {
	const equalPasswords = password === confirmPassword;

	if (!equalPasswords) {
		return false;
	}

	return equalPasswords;   // returns TRUE
}

function validatePassword (password, confirmPassword) {
	const isLowercase = lowerCasePwd(password);
	const isUppercase = upperCasePwd(password);
	const isNumber = numberPwd(password);
	const isLong = longPwd(password);
	//const matchingPwd = checkPasswordsMatch(password, confirmPassword);

	if (!isLowercase || !isUppercase || !isNumber || !isLong) {
		return;
	}

	return true;
}

module.exports = {
	checkDuplicateUsername,
	validateEmail,
	checkDuplicateEmail,
	validatePassword,
	checkPasswordsMatch
};