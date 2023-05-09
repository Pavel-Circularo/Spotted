<template>
  <div class="flex flex-col items-center justify-center my-40 md:mx-0 mx-5">
    <form
      class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mb-5"
      @submit.prevent="resetPassword()"
    >
      <h1 class="text-3xl font-medium mb-5 text-center text-teal-600">
        Reset Password
      </h1>
      <label class="block text-gray-700 font-medium mb-5" for="email">
        New password
        <div class="relative">
          <input
            v-model="newPassword"
            :type="showPassword ? 'text' : 'password'"
            class="bg-gray-200 p-2 rounded-lg w-full shadow-md mt-2 pr-10"
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
      </label>
      <label class="block text-gray-700 font-medium mb-5" for="email">
        Confirm new password
        <div class="relative">
          <input
            v-model="newPasswordConfirm"
            :type="showPasswordConfirm ? 'text' : 'password'"
            class="bg-gray-200 p-2 rounded-lg w-full shadow-md mt-2 pr-10"
            required
          />
          <button
            type="button"
            class="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500"
            @click="showPasswordConfirm = !showPasswordConfirm"
          >
            {{ showPasswordConfirm ? "HIDE" : "SHOW" }}
          </button>
        </div>
      </label>
      <div v-if="!passwordsMatch" class="text-red-600 dont-medium mb-2">
        Passwords do not match.
      </div>
      <div class="flex items-center justify-center">
        <button
          class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2"
          type="submit"
          :disabled="!passwordsMatch"
          :class="{ 'cursor-not-allowed': !passwordsMatch }"
        >
          Reset
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import useAuthUser from "@/composables/UseAuthUser";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const newPassword = ref("");
    const newPasswordConfirm = ref("");
    const passwordsMatch = computed(
      () => newPassword.value === newPasswordConfirm.value
    );
    const showPassword = ref(false);
    const showPasswordConfirm = ref(false);

    const { update } = useAuthUser();
    const resetPassword = async () => {
      if (newPassword.value !== newPasswordConfirm.value) {
        throw new Error("Passwords do not match");
      }
      await update({
        password: newPassword.value,
      });
      alert("Password reset successfully");
      router.push({ name: "Profile" });
    };

    return {
      resetPassword,
      newPassword,
      newPasswordConfirm,
      passwordsMatch,
      showPassword,
      showPasswordConfirm,
    };
  },
};
</script>
