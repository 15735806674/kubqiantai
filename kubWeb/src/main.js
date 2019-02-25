import Vue from 'vue';
import App from './App';
import 'fullpage.js/vendors/scrolloverflow'
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import qs from 'qs'
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
import 'font-awesome/scss/font-awesome.scss'; //icon
import "babel-polyfill";
import 'animate.css';
import 'vue-fullpage/vue-fullpage.css';
import 'fullpage.js/vendors/scrolloverflow' // Optional. When using scrollOverflow:true
import 'swiper/dist/css/swiper.css'
import http from './http/api';
Vue.prototype.$qs = qs
Vue.prototype.$ = http;
Vue.prototype.$Bus = new Vue()

import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

import VueFullpage from 'fullpage-vue'
Vue.use(VueFullpage)

Vue.use(ElementUI, { size: 'small' });
Vue.prototype.$axios = axios;

//组件
//可优比底部
import footers from './components/common/footer.vue';
Vue.component("footers", footers);
//头部
import headers from './components/common/header.vue';
Vue.component("headers", headers);
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');