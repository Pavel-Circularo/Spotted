<template>
  <div>
    <form @submit.prevent="login">
      <label for="email">Email</label>
      <input v-model="email" type="email" id="email" required />

      <label for="password">Password</label>
      <input v-model="password" type="password" id="password" required />

      <button type="submit">Log in</button>
    </form>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script>
import { createClient } from "@supabase/supabase-js";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      // Initialize the Supabase client
      const supabase = createClient(
        "https://izptjbyyibydlsfuaujz.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6cHRqYnl5aWJ5ZGxzZnVhdWp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMyOTYxMjgsImV4cCI6MTk4ODg3MjEyOH0.-SyzrjRctkoUMdW4jwFSCd07ACAU-_vt1mQ5pWLM2R8"
      );

      // Log the user in
      try {
        await supabase.auth.login({
          email: this.email,
          password: this.password,
        });
        this.error = "";
        console.log("Successfully logged in");
        // Redirect the user to the dashboard or home page
        this.$router.push({ name: "dashboard" });
      } catch (error) {
        this.error = error.message;
        console.error(error);
      }
    },
  },
};
</script>
