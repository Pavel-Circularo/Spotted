<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <div class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mb-5">
      <h1 class="text-3xl font-medium mb-7 text-center text-teal-600">
        Thanks for your registration!
      </h1>
      <p class="text-xl font-medium mb-7 text-center text-brand-green-1">
        Confirm your email to finishing account activation:<br />
        {{ $route.query.email }}
      </p>
      <div class="flex items-center justify-center">
        <router-link
          class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2"
          to="/"
        >
          Go back Home
        </router-link>
      </div>
    </div>
  </div>
</template>
