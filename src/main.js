import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import store from './store'
import loadImage from './plugins/loadImage'
// index 이름의 js 파일은 생략가능함

createApp(App)
  .use(router) //$route, $router 플러그인으로 만들어서 등록해서 사용한것
  .use(store) //$store
  .use(loadImage) 
  .mount('#app')