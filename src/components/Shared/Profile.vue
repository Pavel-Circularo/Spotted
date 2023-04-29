<template>
  <div v-if="user" class="h-screen container mx-auto px-6 p-10">
    <!-- <h2
      class="text-4xl flex font-bold text-center text-brand-white-1 mt-10 mb-11 md:text-4xl lg:text-6xl justify-center"
    >
      Account information {{ user.user_metadata.name }}
    </h2> -->
    <div class="container mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Basic Info</h2>
        <div class="flex flex-col md:flex-row md:items-center">
          <div class="md:w-1/3 mb-4 md:mb-0">
            <label class="block text-gray-700 font-bold mb-2" for="email">
              Email
            </label>
            <div class="text-gray-900">{{ user.email }}</div>
          </div>
          <div class="md:w-1/3 mb-4 md:mb-0">
            <label class="block text-gray-700 font-bold mb-2" for="name">
              Name
            </label>
            <div class="text-gray-900">{{ user.user_metadata.name }}</div>
          </div>
        </div>
      </div>

      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-4">Garage Info</h2>
        <div class="flex flex-col md:flex-row md:items-center">
          <div class="md:w-1/3 mb-4 md:mb-0">
            <label class="block text-gray-700 font-bold mb-2">
              Size of the Garage
            </label>
            <div class="text-gray-900"><!-- {{ garageSize }} --></div>
          </div>
          <div class="md:w-1/3 mb-4 md:mb-0">
            <label class="block text-gray-700 font-bold mb-2">
              Most Uploaded Car Maker
            </label>
            <div class="text-gray-900"><!-- {{ mostUploadedMaker }} --></div>
          </div>
          <div class="md:w-1/3 mb-4 md:mb-0">
            <label class="block text-gray-700 font-bold mb-2">
              Most Frequent Color and Year
            </label>
            <div class="text-gray-900">
              <!-- {{ mostFrequentColorAndYear }} -->
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <button
          class="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Reset Password
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import useAuthUser from "@/composables/UseAuthUser.js";
const { user } = useAuthUser();
</script>
