<template>
  <header class="w-full text-sm h-16">
    <div class="fixed top-0 left-0 w-full h-16 bg-white">
      <div
        class="flex flex-nowrap h-full px-8 mx-auto border-b border-solid border-brand-grey-1"
      >
        <router-link
          :to="{ name: 'Home' }"
          class="flex items-center h-full text-xl"
          >Spotted</router-link
        >
        <nav class="h-full ml-12">
          <ul class="flexbox h-full p-0 m-0 list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem"
              class="h-full ml-9 inline-block first:ml-0"
              data-test="main-nav-list-item"
            >
              <a href="" class="flex items-center h-full py-2.5">{{
                menuItem
              }}</a>
            </li>
          </ul>
        </nav>

        <div class="flex items-center h-full ml-auto">
          <profile-image
            v-if="isLoggedIn"
            data-test="profile-image"
          ></profile-image>
          <!-- <action-button
            v-else
            text="Sign in"
            type="primary"
            data-test="login-button"
            @click="loginUser"
          /> -->
          <router-link to="/login"
            ><button
              class="px-5 py-3 font-medium rounded text-white bg-brand-blue-1 hover:shadow-blue"
            >
              Log In
            </button></router-link
          >
          <router-link to="/register"
            ><button
              class="px-5 py-3 font-medium rounded text-brand-blue-1 bg-transparent hover:bg-brand-blue-2 hover:text-white"
            >
              Register
            </button></router-link
          >
        </div>
      </div>
    </div>
  </header>
</template>

<script>
//import ActionButton from "@/components/Shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";

export default {
  name: "MainNav",
  components: {
    //ActionButton,
    ProfileImage,
  },
  data() {
    return {
      menuItems: [
        "Teams",
        "Locations",
        "Life at Spotted",
        "How we hire",
        "Students",
        "Jobs",
      ],
      isLoggedIn: false,
    };
  },
  computed: {},
  methods: {
    loginUser() {
      this.isLoggedIn = true;
    },
  },
};
</script>
