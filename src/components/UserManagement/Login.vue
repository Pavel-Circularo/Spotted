<template>
  <div class="bg-gray-200 flex items-center justify-center h-screen">
    <form class="bg-white p-6 rounded-lg" @submit.prevent="login">
      <h2 class="text-lg font-medium mb-4">Log in</h2>
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
          Log in
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { createClient } from "@supabase/supabase-js";
import cookie from "js-cookie";

export default {
  data() {
    return {
      form: {
        email: "",
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
    async login() {
      try {
        const { email, password } = this.form;
        // Send a request to Supabase to log in the user
        const { token } = await this.supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        // Save the token in an HttpOnly cookie
        cookie.set("token", token, { httpOnly: true });
        // Redirect the user to the dashboard
        //this.$router.push("/");
      } catch (error) {
        console.log(error);
        this.error = error.message;
      }
    },
  },
};
</script>
