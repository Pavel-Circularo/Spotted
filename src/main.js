import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import "@/assets/tailwind.css";
import { GDialog } from "gitart-vue-dialog";
import "gitart-vue-dialog/dist/style.css";

const app = createApp(App);

app.component("GDialog", GDialog);

app.use(router).mount("#app");
