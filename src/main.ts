import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes.js";

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

const app = createApp(App);
app.use(router);
app.mount("#app");
