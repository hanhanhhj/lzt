import Vue from 'vue'
import App from './App.vue'
import "@/mobile/flexible"
import "@/styles/reset.css"

import router from '@/router'

import { recommendMusicAPI } from './api'

async function myFn(){
  const res = await recommendMusicAPI();
  console.log(res);
}
myFn()

import { Tabbar, TabbarItem ,NavBar , Col, Row,
          Image as VanImage,Cell,Icon,Search,List } from 'vant';  
Vue.use(Tabbar);
Vue.use(TabbarItem);//tabbar 底部
Vue.use(NavBar); //navbar 顶部
Vue.use(Col)
Vue.use(Row)
Vue.use(VanImage)
Vue.use(Cell)
Vue.use(Icon)
Vue.use(Search)
Vue.use(List)


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
