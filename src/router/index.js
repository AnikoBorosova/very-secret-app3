import Vue from "vue";
import Router from "vue-router";
//import registration from "@/components/registration";
const registration = require("../components/registration");

Vue.use(Router);

export default new Router({
	routes: [
		/*{
			path: "/",
			name: ""
		},
		*/
		{
			path: "/",
			component: registration
		}/*
		{
			path: "/registration",
			component: registration
		}*/
	]
});
