import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store/index"
import filter from './filter/index'


/*********轮播插件****************/
import VueAwesomeSwiper from "vue-awesome-swiper"
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper)


/*********** 有赞 ui库*******************/
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import {Lazyload} from "vant"

Vue.use(Vant);
Vue.use(Lazyload);


/*************** 域名 信息 查看*****************************/
function search(url) {
  if (url.split("?")[0]) {
    return url.split("?")[1].split("&")[0].split("=")[1];
  } else {
    return false;
  }
}

let code = search(location.href);

// alert(code)
store.dispatch("wxlogin", {code: code})
  .then(response => {
    store.commit("SET_responseCode", JSON.stringify(response))
    if (response.success) {
      store.commit("SET_userInfo", response.result)
      localStorage.setItem("UserInfo", JSON.stringify(response.result))
      router.replace({name: 'home'})
    } else {
      if (response.errorCode === '800000') {
        store.commit("SET_openid", response.result)
        router.push({name: 'Choice'})
      }
    }
  })
  .catch(error => {
    alert(JSON.stringify(error))
  });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
