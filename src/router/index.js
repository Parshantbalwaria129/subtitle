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
    // props: (route) => ({
    //   //   fileName: route.query.videoFile,
    //   //   fileSize: route.query.vidoeSize,
    //   fileURL: route.query.videoURL,
    // }),
    // alias: "/editorr",
  },
  // {
  //   path: "/editor/:selectedVideoFile",
  //   name: "EditorView",
  //   component: EditorView,
  //   props: true,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
