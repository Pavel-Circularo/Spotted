<!-- <form class="max-w-lg m-auto" @submit.prevent="handleSubmit">
    <h1 class="text-3xl mb-5">Register</h1>
    <label>Name <input v-model="form.name" type="text" /></label>
    <label>Email <input v-model="form.email" type="email" /></label>
    <label>Password <input v-model="form.password" type="password" /></label>
    <button>Register</button>
  </form> -->

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <form
      class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mb-5"
      @submit.prevent="handleSubmit"
    >
      <h1 class="text-3xl font-medium mb-5 text-center text-teal-600">
        Create account
      </h1>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="name">
          Name
        </label>
        <input
          id="name"
          v-model="form.name"
          class="bg-gray-200 p-2 rounded-lg w-full shadow-md"
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
      <div class="flex items-center justify-center">
        <button
          type="submit"
          class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2"
        >
          Register
        </button>
      </div>
    </form>
    <!-- Ready for GitHub -->
    <!-- <div class="mt-5">
      <a
        class="text-teal-600 hover:underline"
        @click.prevent="handleLogin('github')"
      >
        Github
      </a>
    </div> -->
    <div>
      <router-link
        type="submit"
        class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2"
        to="/login"
      >
        Already registered? Login!
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import useAuthUser from "@/composables/UseAuthUser";
import { useRouter } from "vue-router";

// Use necessary composables
const router = useRouter();
const { register } = useAuthUser();

// Form reactive ref to keep up with the form data
const form = ref({
  name: "",
  email: "",
  password: "",
});

// function to hand the form submit
const handleSubmit = async () => {
  try {
    // use the register method from the AuthUser composable
    await register(form.value);

    // and redirect to a EmailConfirmation page the will instruct
    // the user to confirm they're email address
    router.push({
      name: "EmailConfirmation",
      query: { email: form.value.email },
    });
  } catch (error) {
    alert(error.message);
  }
};
</script>
