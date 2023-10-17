import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import drag from "v-drag";
import utils from "./utils";

import "bootstrap/dist/css/bootstrap.css";
// const drag = require("v-drag");
const app = createApp(App).use(store).use(router).use(drag);
app.config.globalProperties.$utils = utils;
app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
