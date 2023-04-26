<template>
  <div class="container mx-auto">
    <h1 class="text-4xl font-bold text-gray-800 my-4 text-center">Gallery</h1>
    <div class="my-4 flex justify-center space-x-4">
      <input
        v-model="brandFilter"
        type="text"
        placeholder="Brand"
        class="border-gray-400 border-2 rounded-lg p-2"
      />
      <input
        v-model="modelFilter"
        type="text"
        placeholder="Model"
        class="border-gray-400 border-2 rounded-lg p-2"
      />
      <input
        v-model="yearFilter"
        type="text"
        placeholder="Year"
        class="border-gray-400 border-2 rounded-lg p-2"
      />
      <input
        v-model="colorFilter"
        type="text"
        placeholder="Color"
        class="border-gray-400 border-2 rounded-lg p-2"
      />
    </div>

    <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div v-for="item in filteredGalleryData" :key="item.id">
        <img
          :src="item.url"
          :alt="item.brand"
          class="w-full rounded-lg shadow-lg"
          @click="enlargeImage(item.url)"
        />
        <div class="bg-white rounded-lg shadow-lg p-4">
          <h2 class="text-lg font-bold">{{ item.brand }} {{ item.model }}</h2>
          <p class="text-gray-500">Year: {{ item.year }}</p>
          <p class="text-gray-500">Color: {{ item.color }}</p>
        </div>
      </div>
    </div>
    <div
      v-if="enlarged"
      class="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center z-50"
    >
      <img
        :src="enlarged"
        class="max-h-screen max-w-screen rounded-lg shadow-lg"
        @click="enlarged = null"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import useSupabase from "@/composables/UseSupabase.js";
import useAuthUser from "@/composables/UseAuthUser.js";

export default {
  name: "Gallery",
  setup() {
    const galleryData = ref([]);
    const { user } = useAuthUser();
    const { supabase } = useSupabase();
    const enlarged = ref(null);

    const brandFilter = ref("");
    const modelFilter = ref("");
    const yearFilter = ref("");
    const colorFilter = ref("");

    const fetchGalleryData = async () => {
      let { data: cars, error } = await supabase
        .from("cars")
        .select("*")
        .eq("user", user._rawValue.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        galleryData.value = cars;
      }
    };

    const enlargeImage = (url) => {
      enlarged.value = url;
    };

    const filteredGalleryData = computed(() => {
      return galleryData.value.filter((item) => {
        return (
          item.brand.toLowerCase().includes(brandFilter.value.toLowerCase()) &&
          item.model.toLowerCase().includes(modelFilter.value.toLowerCase()) &&
          item.year.toString().includes(yearFilter.value) &&
          item.color.toLowerCase().includes(colorFilter.value.toLowerCase())
        );
      });
    });

    onMounted(async () => {
      await fetchGalleryData();
    });
    return {
      galleryData,
      brandFilter,
      modelFilter,
      yearFilter,
      colorFilter,
      filteredGalleryData,
      enlargeImage,
      enlarged,
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

h1.text-gray-800 {
  font-size: 2.5rem;
  color: #35495e;
}
</style>
