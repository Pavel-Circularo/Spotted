<template>
  <div class="flex flex-col items-center justify-center my-28 md:mx-0 mx-5">
    <form
      class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mb-5"
      @submit.prevent="handleSubmit"
    >
      <h1 class="text-3xl font-medium mb-5 text-center text-teal-600">
        Create account
      </h1>
      <div class="mb-4">
        <transition name="tada">
          <div
            v-if="alert.show"
            class="bg-red-500 p-2 rounded-lg shadow-md w-full mb-2 text-center text-white"
          >
            {{ alert.message }}
          </div>
        </transition>
        <label class="block text-gray-700 font-medium mb-2" for="username">
          Username
        </label>
        <input
          id="username"
          v-model="form.username"
          class="bg-gray-200 p-2 rounded-lg w-full shadow-md"
          type="text"
          required
          minlength="3"
          @blur="handleUsernameBlur"
          @input="handleUsernameInput"
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
        <div class="relative">
          <input
            id="password"
            v-model="form.password"
            class="bg-gray-200 p-2 rounded-lg w-full shadow-md"
            :type="showPassword ? 'text' : 'password'"
            required
          />
          <button
            type="button"
            class="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
            @click="showPassword = !showPassword"
          >
            {{ showPassword ? "HIDE" : "SHOW" }}
          </button>
        </div>
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
import { ref, onMounted } from "vue";
import useAuthUser from "@/composables/UseAuthUser";
import useSupabase from "@/composables/UseSupabase.js";
import { useRouter } from "vue-router";

// Use necessary composables
const router = useRouter();
const { register, user } = useAuthUser();
const showPassword = ref(false);
const { supabase } = useSupabase();
//const error = ref("");

// Form reactive ref to keep up with the form data
const form = ref({
  email: "",
  password: "",
  username: "",
});

const alert = ref({
  show: false,
  message: "",
});

const showAlert = (message) => {
  alert.value.message = message;
  alert.value.show = true;
};

// onMounted hook to check if user is logged in and redirect to home
onMounted(() => {
  if (user.value) {
    router.push({ name: "Home" });
  }
});

// check if the username already exists
const handleUsernameBlur = async () => {
  try {
    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", form.value.username);
    if (data.length) {
      showAlert("Username already exists.");
    }
  } catch (error) {
    alert(error.message);
  }
};

// reset the error when the user types
const handleUsernameInput = () => {
  alert.value.show = false;
};

// function to hand the form submit
const handleSubmit = async () => {
  try {
    // check if the email already exists
    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", form.value.username);
    if (data.length) {
      return;
    }

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
<style>
.tada-enter-active {
  animation: tada 0.8s;
}

@keyframes tada {
  0% {
    transform: scale3d(1, 1, 1);
  }
  10%,
  20% {
    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
  }
  30%,
  50%,
  70%,
  90% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
  }
  40%,
  60%,
  80% {
    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
  }
  100% {
    transform: scale3d(1, 1, 1);
  }
}
</style>
