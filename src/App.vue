<template>
  <div id="app" class="bg-brand-gradient flex flex-col min-h-screen">
    <app-header-vue />
    <main class="flex-grow">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script>
import AppHeaderVue from "@/components/Navigation/AppHeader.vue";
import Footer from "@/components/Shared/Footer.vue";

export default {
  name: "App",
  components: {
    AppHeaderVue,
    Footer,
  },
};
</script>
