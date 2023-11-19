import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// import Markdown from "vue3-markdown-it";
import "highlight.js/styles/monokai.css";

const app = createApp(App);
// app.use(Markdown);
app.use(createPinia());
app.use(router);

app.mount("#app");
