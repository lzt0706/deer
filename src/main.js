// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router';
import './bus';
import currencyFilter from './filters/currency';
import VeeValidate from 'vee-validate';
import zhTWValidate from 'vee-validate/dist/locale/zh_TW';

import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(VueAxios, axios);
Vue.use('Loading', Loading);
Vue.use(VeeValidate);
VeeValidate.Validator.localize('zh_TW', zhTWValidate);
Vue.config.productionTip = false;
Vue.filter('currency', currencyFilter);

axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
})

router.beforeEach((to, from, next) => {
  console.log('to', to, 'from', from, 'next', next);
  if (to.meta.requiresAuth) {
    console.log('這裡需要驗證');
    const api = `${process.env.APIPATH}/api/user/check`; //'https://vue-course-api.hexschool.io/api/deer/products'
    axios.post(api).then(response => {
      console.log(response.data);
      if (response.data.success){
        next();
      }else {
        next({
          path: '/login'
        });
      }
    });
  }
  else {
    next();
  }
})