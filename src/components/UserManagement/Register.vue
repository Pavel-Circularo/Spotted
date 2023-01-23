<template>
  <div class="bg-gray-200 flex items-center justify-center h-screen">
    <form class="bg-white p-6 rounded-lg" @submit.prevent="register">
      <h2 class="text-lg font-medium mb-4">Register</h2>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="username">
          Username
        </label>
        <input
          id="username"
          v-model="form.username"
          class="border border-gray-400 p-2 rounded-lg w-full"
          type="text"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="email">
          Email
        </label>
        <input
          id="email"
          v-model="form.email"
          class="border border-gray-400 p-2 rounded-lg w-full"
          type="email"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="password">
          Password
        </label>
        <input
          id="password"
          v-model="form.password"
          class="border border-gray-400 p-2 rounded-lg w-full"
          type="password"
          required
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
          type="submit"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { createClient } from "@supabase/supabase-js";

export default {
  data() {
    return {
      form: {
        email: "",
        username: "",
        password: "",
      },
      error: null,
    };
  },
  created() {
    // Initialize Supabase with the URL and key from environment variables
    this.supabase = createClient(
      process.env.VUE_APP_SUPABASE_URL,
      process.env.VUE_APP_SUPABASE_ANON_KEY
    );
  },
  methods: {
    async register() {
      // Initialize the Supabase client
      /* const supabase = createClient(
        "https://izptjbyyibydlsfuaujz.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6cHRqYnl5aWJ5ZGxzZnVhdWp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMyOTYxMjgsImV4cCI6MTk4ODg3MjEyOH0.-SyzrjRctkoUMdW4jwFSCd07ACAU-_vt1mQ5pWLM2R8"
      ); */

      // Register the user
      try {
        await this.supabase.auth.signUp({
          email: this.email,
          username: this.username,
          password: this.password,
        });
        //this.error = "";
        console.log("Successfully registered");
        // Redirect the user to the login page or display a success message
        this.$router.push({ name: "Login" });
      } catch (error) {
        this.error = error.message;
        console.error(error);
      }
    },
  },
};
</script>
