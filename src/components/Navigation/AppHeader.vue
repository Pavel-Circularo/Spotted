<template>
  <nav class="flex items-center justify-between flex-wrap bg-brand-white-1 p-6">
    <div class="flex items-center flex-shrink-0 text-white mr-8">
      <router-link :to="{ name: 'Home' }">
        <img src="@/assets/logo.png" alt="Logo" class="h-16" />
      </router-link>
    </div>
    <div class="relative lg:hidden">
      <button
        id="options-menu"
        class="inline-flex items-center px-4 py-2 text-base font-medium rounded-md text-brand-white-1 bg-brand-white-1 hover:ring-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gradient"
        :class="{ 'bg-brand-white-1': isMenuOpen }"
        type="button"
        aria-haspopup="true"
        aria-expanded="true"
        @click="isMenuOpen = !isMenuOpen"
      >
        <div class="space-y-2">
          <div class="w-8 h-0.5 bg-gray-600"></div>
          <div class="w-8 h-0.5 bg-gray-600"></div>
          <div class="w-8 h-0.5 bg-gray-600"></div>
        </div>
      </button>

      <div
        v-show="isMenuOpen"
        class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-brand-white-1 ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div class="py-1" role="none">
          <ul v-if="!isLoggedIn()">
            <li>
              <router-link
                :to="{ name: 'Home' }"
                class="block px-4 py-2 text-sm text-brand-green-1 hover:bg-brand-green-1 hover:text-brand-white-1"
                role="menuitem"
                @click="isMenuOpen = false"
              >
                Home
              </router-link>
            </li>
          </ul>
          <ul v-else>
            <li>
              <router-link
                :to="{ name: 'Profile' }"
                class="block px-4 py-2 text-sm text-brand-green-1 hover:bg-brand-green-1 hover:text-brand-white-1"
                role="menuitem"
                @click="isMenuOpen = false"
              >
                My Profile
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'UploadCar' }"
                class="block px-4 py-2 text-sm text-brand-green-1 hover:bg-brand-green-1 hover:text-brand-white-1"
                role="menuitem"
                @click="isMenuOpen = false"
              >
                Upload Car
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'Gallery' }"
                class="block px-4 py-2 text-sm text-brand-green-1 hover:bg-brand-green-1 hover:text-brand-white-1"
                role="menuitem"
                @click="isMenuOpen = false"
              >
                Garage
              </router-link>
            </li>
          </ul>
          <ul v-if="isLoggedIn()">
            <li>
              <router-link
                :to="{ name: 'Logout' }"
                class="block px-4 py-2 text-sm text-red-500 hover:bg-brand-green-1 hover:text-brand-white-1 font-bold"
                @click="isMenuOpen = false"
                >Logout</router-link
              >
            </li>
          </ul>
          <ul v-else>
            <li>
              <router-link
                :to="{ name: 'Login' }"
                class="block px-4 py-2 text-sm text-brand-green-1 hover:bg-brand-green-1 hover:text-brand-white-1"
                @click="isMenuOpen = false"
                >Login</router-link
              >
            </li>
            <li>
              <router-link
                :to="{ name: 'Register' }"
                class="block px-4 py-2 text-sm text-brand-green-1 hover:bg-brand-green-1 hover:text-brand-white-1"
                >Register</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden">
      <div class="text-sm lg:flex-grow">
        <ul v-if="!isLoggedIn()">
          <li>
            <router-link
              :to="{ name: 'Home' }"
              class="block mt-4 lg:inline-block lg:mt-0 text-brand-green-1 text-2xl hover:text-white mr-6"
            >
              Home
            </router-link>
          </li>
        </ul>
        <ul v-else class="flex gap-3 p-2">
          <li>
            <router-link
              :to="{ name: 'Profile' }"
              class="block mt-4 lg:inline-block lg:mt-0 text-brand-green-1 text-2xl hover:text-white mr-6"
            >
              My Profile
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'UploadCar' }"
              class="block mt-4 lg:inline-block lg:mt-0 text-brand-green-1 text-2xl hover:text-white mr-6"
            >
              Upload Car
            </router-link>
          </li>
          <li>
            <router-link
              :to="{ name: 'Gallery' }"
              class="block mt-4 lg:inline-block lg:mt-0 text-brand-green-1 text-2xl hover:text-white mr-6"
            >
              Garage
            </router-link>
          </li>
        </ul>
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
import { ref } from "vue";

const { isLoggedIn } = useAuthUser();
const isMenuOpen = ref(false);
</script>
