import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/home/HomeView.vue";
import AboutView from "../views/about/AboutView.vue";
import EditorView from "../views/editor/index.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },

  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
  {
    path: "/editor",
    name: "EditorView",
    component: EditorView,
  },
];

const router = createRouter({
  routes,
});

export default router;
