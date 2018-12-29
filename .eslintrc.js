// https://eslint.org/docs/user-guide/configuring

module.exports = {
	root: true,
	parserOptions: {
		"ecmaVersion": 6,
		parser: "babel-eslint"
	},
	env: {
		"es6": true,
		browser: true
	},
	extends: [
		// https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
		// consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
		"plugin:vue/essential"
	],
	// required to lint *.vue files
	plugins: ["vue"],
	// add your custom rules here
	rules: {
		// allow async-await
		"generator-star-spacing": "off",
		// allow debugger during development
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-reserved-keys": 0,
		indent: ["error", "tab", { SwitchCase: 1 }],
		"indent-size": [true, 4],
		"ter-indent": [true, 4],
		"eol-last": "off",
		"no-return-assign": 0,
		semi: ["error", "always"],
		"no-tabs": "off",
		quotes: ["error", "double"],
		"default-case": ["error"]
	}
};
