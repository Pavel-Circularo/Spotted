<template>
  <div class="bg-gray-200 flex items-center justify-center h-screen">
    <form class="bg-white p-6 rounded-lg" @submit.prevent="handleSubmit">
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
import { ref } from "vue";
import useAuthUser from "@/composables/UseAuthUser.js";

const { register } = useAuthUser();

const form = ref({
  name: "",
  email: "",
  password: "",
});

export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      async () => {
        try {
          // use the register method from the AuthUser composable
          await register(form.value);

          // and redirect to a EmailConfirmation page the will instruct
          // the user to confirm they're email address
          this.$router.push({
            name: "EmailConfirmation",
            query: { email: form.value.email },
          });
        } catch (error) {
          alert(error.message);
        }
      };
    },
  },
};
</script>
