<template>
  <nav class="flex items-center justify-between flex-wrap bg-brand-white-1 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-8">
      <router-link :to="{ name: 'Home' }">
        <img src="@/assets/logo.png" alt="Logo" class="h-16" />
      </router-link>
    </div>

    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
      <div class="text-sm lg:flex-grow">
        <router-link
          :to="{ name: 'Home' }"
          class="block mt-4 lg:inline-block lg:mt-0 text-brand-green-1 text-2xl hover:text-white mr-6"
        >
          Home
        </router-link>
        <router-link
          :to="{ name: 'Me' }"
          class="block mt-4 lg:inline-block lg:mt-0 text-brand-green-1 text-2xl hover:text-white mr-6"
        >
          Me
        </router-link>
        <router-link
          :to="{ name: 'UploadCar' }"
          class="block mt-4 lg:inline-block lg:mt-0 text-brand-green-1 text-2xl hover:text-white mr-6"
        >
          Upload Car
        </router-link>
        <router-link
          :to="{ name: 'Gallery' }"
          class="block mt-4 lg:inline-block lg:mt-0 text-brand-green-1 text-2xl hover:text-white mr-6"
        >
          Gallery
        </router-link>
      </div>
      <div>
        <ul v-if="isLoggedIn()" class="flex gap-5 p-2">
          <li>
            <router-link
              :to="{ name: 'Logout' }"
              class="block mt-4 lg:inline-block lg:mt-0 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
              >Logout</router-link
            >
          </li>
        </ul>
        <ul v-else class="flex gap-5 p-2">
          <li>
            <router-link
              :to="{ name: 'Login' }"
              class="block mt-4 lg:inline-block lg:mt-0 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
              >Login</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'Register' }"
              class="block mt-4 lg:inline-block lg:mt-0 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
              >Register</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import useAuthUser from "@/composables/UseAuthUser";
const { isLoggedIn } = useAuthUser();
</script>
