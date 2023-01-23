<template>
  <div v-if="authenticated">
    <p>Welcome, {{ user.data.user.email }}</p>
  </div>
  <div v-else>
    <p>You are not logged in.</p>
  </div>
</template>

<script>
import { createClient } from "@supabase/supabase-js";

export default {
  name: "Welcome",
  data() {
    return {
      authenticated: false,
      user: {},
    };
  },
  created() {
    const supabase = createClient(
      process.env.VUE_APP_SUPABASE_URL,
      process.env.VUE_APP_SUPABASE_ANON_KEY
    );
    supabase.auth.getUser().then((user) => {
      if (user) {
        this.authenticated = true;
        this.user = user;
      }
    });
  },
};
</script>
