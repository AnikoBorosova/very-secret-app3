// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import initApp from './initApp'
import router from './router'
import Vuetify from "vuetify";
/*import "vuetify/dist/vuetify.min.css";

Vue.config.productionTip = false

Vue.use(Vuetify, {
	theme: {
		primary: "#00c0e7",
		secondary: "#009f4a"
	}
});*/


const App = initApp();

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
