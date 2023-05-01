<template>
  <div v-if="authenticated" class="h-screen container mx-auto px-6 p-10">
    <h2
      class="text-4xl flex font-bold text-center text-brand-white-1 mt-10 mb-11 md:text-4xl lg:text-6xl justify-center"
    >
      Welcome {{ user.data.user.user_metadata.username }}
    </h2>
    <p class="text-center text-brand-white-1 mb-8">
      Head over to your garage to check your collection or set up your account.
    </p>
    <div class="flex justify-center">
      <button
        class="relative w-60 h-36 bg-white text-white font-bold text-2xl rounded-lg overflow-hidden focus:outline-none mr-5"
      >
        <router-link :to="{ name: 'Gallery' }">
          <div
            class="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out transform hover:translate-y-36"
          >
            <img class="w-full h-full" src="@/assets/garage1.jpg" alt="car" />
          </div>
          <div
            class="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out transform hover:translate-y-0"
          >
            <img
              class="w-full h-full object-contain"
              src="@/assets/lambo.jpg"
              alt="garage door"
            />
          </div>
        </router-link>
      </button>
      <router-link
        :to="{ name: 'Profile' }"
        class="relative w-60 h-36 bg-white text-white font-bold text-2xl rounded-lg overflow-hidden focus:outline-none ml-5"
      >
        <img
          class="w-full h-full object-contain"
          src="@/assets/user-profile.png"
          alt="garage door"
        />
      </router-link>
    </div>
  </div>
  <div v-else class="h-full">
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

<script>
import { createClient } from "@supabase/supabase-js";

export default {
  name: "Welcome",
  data() {
    return {
      authenticated: false,
      user: {},
    };
  },
  created() {
    const supabase = createClient(
      process.env.VUE_APP_SUPABASE_URL,
      process.env.VUE_APP_SUPABASE_ANON_KEY
    );
    supabase.auth.getUser().then((user) => {
      if (user) {
        this.authenticated = true;
        this.user = user;
      }
    });
  },
};
</script>

<style>
button:hover .absolute:nth-child(1) {
  transform: translateY(-100%);
}

button .absolute:nth-child(2) {
  opacity: 0;
}

button:hover .absolute:nth-child(2) {
  opacity: 1;
}

button .absolute {
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}
</style>
