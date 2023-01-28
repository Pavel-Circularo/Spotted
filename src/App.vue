<template>
  <div>
    <app-header-vue />
    <router-view />
  </div>
</template>

<script>
import AppHeaderVue from "@/components/Navigation/AppHeader.vue";

export default {
  name: "App",
  components: {
    AppHeaderVue,
  },
};
</script>
