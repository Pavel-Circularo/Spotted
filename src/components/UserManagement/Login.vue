<template>
  <div class="bg-gray-200 flex items-center justify-center h-screen">
    <form class="bg-white p-6 rounded-lg" @submit.prevent="handleLogin">
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
      <router-link to="/forgotPassword">Forgot Password?</router-link>
    </form>
    <div class="mt-5">
      <a @click.prevent="handleLogin('github')">Github</a>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import useAuthUser from "@/composables/UseAuthUser";

const { login, loginWithSocialProvider } = useAuthUser();

const form = ref({
  email: "",
  password: "",
});
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
  methods: {
    async handleLogin(provider) {
      try {
        provider
          ? await loginWithSocialProvider(provider)
          : await login(form.value);
        this.$router.push({ name: "Me" });
      } catch (error) {
        alert(error.message);
      }
    },
  },
};
</script>
