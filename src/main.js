// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'vant/lib/icon/local.css'
import {
  Button,
  Field,
  Row,
  Col,
  Search,
  Image,
  Switch,
  Dialog,
  Icon,
  Toast,
  Popup,
  Collapse,
  CollapseItem,
  NavBar,
  Cell,
  CellGroup,
  Tabbar,
  TabbarItem,
  Uploader,
  Area,
  ActionSheet,
  Picker,
  Tab,
  Tabs,
  List
} from 'vant'
// import 'vant/lib/index.css'
// import 'vant/lib/icon/local.css'

Vue.use(Button)
  .use(Field)
  .use(Row)
  .use(Col)
  .use(Search)
  .use(Image)
  .use(Switch)
  .use(Dialog)
  .use(Icon)
  .use(Toast)
  .use(Popup)
  .use(Collapse)
  .use(CollapseItem)
  .use(NavBar)
  .use(Cell)
  .use(CellGroup)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Uploader)
  .use(Area)
  .use(ActionSheet)
  .use(Picker)
  .use(Tab)
  .use(Tabs)
  .use(List)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
