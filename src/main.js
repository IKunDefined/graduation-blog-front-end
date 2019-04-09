// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MuseUI from 'muse-ui'
import VueCookies from 'vue-cookies'
import 'muse-ui/dist/muse-ui.css'
import 'material-icons/iconfont/material-icons.css'
import 'normalize.css'

Vue.use(MuseUI)
Vue.use(VueCookies)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
