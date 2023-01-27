<template>
  <div v-if="user">
    <div>Hello {{ user.user_metadata.name }}</div>
  </div>
</template>

<script>
import useAuthUser from "@/composables/UseAuthUser";

export default {
  data() {
    return {
      user: useAuthUser(),
    };
  },
};
</script>
