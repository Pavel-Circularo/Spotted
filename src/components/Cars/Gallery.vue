<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold my-4">Gallery</h1>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="item in galleryData" :key="item.id">
        <img
          :src="item.url"
          :alt="item.brand"
          class="w-full rounded-lg shadow-lg"
        />
        <div class="bg-white rounded-lg shadow-lg p-4">
          <h2 class="text-lg font-bold">{{ item.brand }} {{ item.model }}</h2>
          <p class="text-gray-500">{{ item.year }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useSupabase from "@/composables/UseSupabase.js";
import useAuthUser from "@/composables/UseAuthUser.js";

export default {
  name: "Gallery",
  setup() {
    const galleryData = ref([]);
    const { user } = useAuthUser();
    const { supabase } = useSupabase();

    const fetchGalleryData = async () => {
      let { data: cars, error } = await supabase
        .from("cars")
        .select("*")
        .eq("user", user._rawValue.id)
        .order("created_at", { ascending: false });

      //const { data: cars, error } = await supabase.from("cars").select("*");
      if (error) {
        console.error(error);
      } else {
        galleryData.value = cars;
      }
    };

    onMounted(async () => {
      await fetchGalleryData();
    });

    return {
      galleryData,
    };
  },
};
</script>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

@media screen and (min-width: 640px) {
  .flex-wrap {
    flex-wrap: wrap;
  }

  .max-w-sm {
    max-width: calc((100% - 6rem) / 2);
  }
}

@media screen and (min-width: 768px) {
  .max-w-sm {
    max-width: calc((100% - 8rem) / 3);
  }
}

@media screen and (min-width: 1024px) {
  .max-w-sm {
    max-width: calc((100% - 10rem) / 4);
  }
}
</style>
