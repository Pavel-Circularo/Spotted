<template>
  <div class="flex flex-col items-center justify-center my-40 md:mx-0 mx-5">
    <form
      class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mb-5"
      @submit.prevent="handlePasswordReset()"
    >
      <h1 class="text-3xl font-medium mb-5 text-center text-teal-600">
        Forgot Password
      </h1>
      <p class="text-center mb-2">
        Input your email to receive a link to reset your password.
      </p>
      <div
        v-if="errAlert.show"
        class="bg-red-500 text-white w-full p-2 rounded-lg shadow-md mb-2 text-center"
      >
        {{ errAlert.message }}
      </div>
      <label class="block text-gray-700 font-medium mb-5" for="email"
        >Email
        <input
          v-model="email"
          class="bg-gray-200 p-2 rounded-lg w-full shadow-md mt-2"
          type="email"
          required
      /></label>
      <div class="flex items-center justify-center">
        <button
          class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2"
        >
          Send email
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import useAuthUser from "@/composables/UseAuthUser";
import { ref } from "vue";
import { useRouter } from "vue-router";

// use necessary composables
const { sendPasswordRestEmail } = useAuthUser();
const router = useRouter();

// keep up with email
const email = ref("");

const errAlert = ref({
  show: false,
  message: "",
});

const showAlert = (message) => {
  errAlert.value.message = message;
  errAlert.value.show = true;
};
// function to call on submit of the form
// triggers sending the reset email to the user
const handlePasswordReset = async () => {
  try {
    await sendPasswordRestEmail(email.value);
    alert(`Password reset email sent to: ${email.value}`);
    router.push({
      name: "Login",
    });
  } catch (error) {
    console.log(error);
    showAlert(error.message, "bg-red-500 text-white w-full");
  }
};
</script>
