<template>
  <div>
    <main-nav />
    <router-view />
  </div>
</template>

<script>
import MainNav from "@/components/Navigation/MainNav.vue";
import { supabase } from "@supabase/supabase-js";
import { onMounted, ref } from "vue";

const session = ref();

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
  });

  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});

export default {
  name: "App",
  components: {
    MainNav,
  },
};
</script>
