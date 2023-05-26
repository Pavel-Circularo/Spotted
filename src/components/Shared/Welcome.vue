<template>
  <div v-if="authenticated" class="container mx-auto px-6 p-10">
    <h2
      class="text-4xl flex font-bold text-center text-brand-white-1 mt-10 mb-11 md:text-4xl lg:text-6xl justify-center"
    >
      Welcome
      {{ user.user_metadata.username }}
    </h2>
    <p class="text-center text-lg text-brand-white-1 mb-8">
      Head over to your garage to check your collection, set up your account or
      upload a new car.
    </p>
    <div class="flex flex-wrap justify-center">
      <router-link
        :to="{ name: 'Gallery' }"
        class="mt-3 text-3xl text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg px-5 py-2.5 text-center mr-2"
      >
        Garage
      </router-link>
      <router-link
        :to="{ name: 'Profile' }"
        class="mt-3 text-3xl text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg px-5 py-2.5 text-center mr-2"
      >
        Profile
      </router-link>
      <router-link
        :to="{ name: 'UploadCar' }"
        class="mt-3 text-3xl text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg px-5 py-2.5 text-center mr-2"
      >
        Upload
      </router-link>
    </div>
  </div>
  <div v-else class="">
    <section class="container mx-auto px-6 p-10">
      <h2
        class="text-4xl font-bold text-center text-brand-white-1 mt-10 mb-11 md:text-4xl lg:text-6xl"
      >
        Welcome to Spotted, your personal car collection
      </h2>
      <div class="flex items-center flex-wrap mb-15">
        <div class="w-full md:w-1/2">
          <h4
            class="text-2xl font-thin text-brand-white-1 mb-3 mr-5 lg:text-4xl"
          >
            Welcome to Spotted, the ultimate destination for car enthusiasts who
            want to build their dream collection without breaking the bank. With
            our platform, you can unleash your inner car enthusiast and build a
            vast collection of car pictures that tell unique and captivating
            stories.
          </h4>
        </div>
        <div class="w-full md:w-1/2">
          <img src="@/assets/honda.png" alt="Car Image" />
        </div>
      </div>
      <div class="flex items-center flex-wrap mb-15 justify-center">
        <router-link
          :to="{ name: 'Register' }"
          class="lg:mt-0 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
          >Start your collectors journey now!</router-link
        >
      </div>
      <div class="flex items-center flex-wrap mb-2">
        <div class="w-full md:w-1/2">
          <img src="@/assets/m3.png" alt="Car Image" />
        </div>
        <div class="w-full md:w-1/2">
          <h4
            class="text-2xl font-thin text-brand-white-1 mb-3 mr-5 lg:text-4xl"
          >
            From vintage classics to modern sports cars, Spotted has something
            for everyone. So whether you're a seasoned collector or just
            starting out, join us on this thrilling ride and let your love for
            cars take the wheel!
          </h4>
        </div>
      </div>
      <div class="flex items-right flex-wrap mb-15 justify-center">
        <router-link
          :to="{ name: 'Login' }"
          class="lg:mt-0 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
          >Already a collector? Login!</router-link
        >
      </div>
    </section>
  </div>
</template>

<script setup>
import useAuthUser from "@/composables/UseAuthUser";
import { onMounted, ref } from "vue";

const { isLoggedIn } = useAuthUser();
const { user } = useAuthUser();

const authenticated = ref(false);

onMounted(() => {
  if (isLoggedIn()) {
    authenticated.value = true;
  }
});
</script>
