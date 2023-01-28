<template>
  <div v-if="user">
    <div>Hello {{ user.user_metadata.name }}</div>
  </div>
</template>

<script setup>
import useAuthUser from "@/composables/UseAuthUser.js";
const { user } = useAuthUser();
</script>
