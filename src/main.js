// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import initApp from './initApp';
import router from './router';

Vue.config.productionTip = false;

const App = initApp();

new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
});
