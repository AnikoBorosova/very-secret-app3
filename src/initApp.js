import Vue from "vue";
//import App from "@/components";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
//import Registration from "@/components/registration";
import Login from "@/components/login";

Vue.use(Vuetify, {
	theme: {
		primary: "#00c0e7",
		secondary: "#009f4a"
	}
});

export default function initApp() {
	return Login;
}