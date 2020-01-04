// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button, Field, Row, Col, Search, Image, Switch, Dialog, Icon, Toast, Popup} from 'vant'
// import 'vant/lib/index.css'
// import 'vant/lib/icon/local.css'

Vue.use(Button).use(Field).use(Row).use(Col).use(Search).use(Image).use(Switch).use(Dialog).use(Icon).use(Toast).use(Popup)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
