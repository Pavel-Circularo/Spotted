<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <form
      class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
      @submit.prevent="handleLogin()"
    >
      <h1 class="text-3xl font-medium mb-5 text-center text-teal-600">Login</h1>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="email">
          Email
        </label>
        <input
          id="email"
          v-model="form.email"
          class="bg-gray-200 p-2 rounded-lg w-full shadow-md"
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
          class="bg-gray-200 p-2 rounded-lg w-full shadow-md"
          type="password"
          required
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2"
        >
          Login
        </button>
        <router-link class="text-teal-600 hover:underline" to="/forgotPassword">
          Forgot Password?
        </router-link>
      </div>
    </form>
    <div class="mt-5">
      <a
        class="text-teal-600 hover:underline"
        @click.prevent="handleLogin('github')"
      >
        Github
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useAuthUser from "@/composables/UseAuthUser";
import { useRouter } from "vue-router";

// Use necessary composables
const router = useRouter();
const { login, loginWithSocialProvider } = useAuthUser();

// keep up with form data
const form = ref({
  email: "",
  password: "",
});

// call the proper login method from the AuthUser composable
// on the submit of the form
const handleLogin = async (provider) => {
  try {
    provider
      ? await loginWithSocialProvider(provider)
      : await login(form.value);
    router.push({ name: "Home" });
  } catch (error) {
    alert(error.message);
  }
};
</script>