import { createApp } from 'vue'
import store from "./store/index.js";
import App from './App.vue'
import router from "./router/index.js"
import mitt from 'mitt';



// element-plus
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

// 页面样式
import "@/utils/css/bootstrap.min.css";
import "@/utils/css/font-awesome.min.css";
import "@/utils/css/ionicons.min.css";
import "@/utils/css/AdminLTE.min.css";
import "@/utils/css/skin-blue.min.css";

// import "./permission.js"

const app = createApp(App)
// app.config.warnHandler = () => { }


app.use(router).use(ElementPlus).use(store)

const emitter = mitt();
app.provide('emitter', emitter);

(async () => {
  await router.isReady()
  console.log("router is aready");
  app.mount("#app")
})()