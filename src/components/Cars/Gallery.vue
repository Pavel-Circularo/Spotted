<template>
  <div class="container mx-auto min-h-screen">
    <h1
      class="text-4xl font-bold text-brand-white-1 my-10 text-center lg:text-6xl"
    >
      My Garage
    </h1>
    <div class="my-10 grid grid-cols-2 md:grid-cols-4 gap-2 justify-center">
      <input
        v-model="brandFilter"
        type="text"
        placeholder="Brand"
        class="border-gray-400 border-2 rounded-lg p-2 md:ml-0 ml-10 shadow-brand-green-1 shadow-md bg-brand-white-1"
      />
      <input
        v-model="modelFilter"
        type="text"
        placeholder="Model"
        class="border-gray-400 border-2 rounded-lg p-2 md:mr-0 mr-10 shadow-brand-green-1 shadow-md bg-brand-white-1"
      />
      <input
        v-model="yearFilter"
        type="text"
        placeholder="Year"
        class="border-gray-400 border-2 rounded-lg p-2 md:ml-0 ml-10 shadow-brand-green-1 shadow-md bg-brand-white-1"
      />
      <input
        v-model="colorFilter"
        type="text"
        placeholder="Color"
        class="border-gray-400 border-2 rounded-lg p-2 md:mr-0 mr-10 shadow-brand-green-1 shadow-md bg-brand-white-1"
      />
      <button
        class="bg-brand-green-1 text-white py-2 px-4 rounded-lg shadow-brand-green-1 hover:bg-brand-green-2"
        @click="searchGalleryData"
      >
        Search
      </button>
    </div>

    <div
      class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mr-10 ml-10 md:mr-0 md:ml-0"
    >
      <div v-for="item in filteredGalleryData" :key="item.id">
        <div class="rounded-lg shadow-lg shadow-brand-green-1">
          <img
            :src="item.url"
            :alt="item.brand"
            class="w-full object-cover rounded-t-lg h-36"
            @click="enlargeImage(item.url)"
          />
          <div
            class="bg-brand-white-1 p-4 rounded-b-lg shadow-lg shadow-brand-green-1"
          >
            <h2 class="text-lg font-bold text-brand-green-1">
              {{ item.brand }} {{ item.model }}
            </h2>
            <p class="text-brand-grey-3">Year: {{ item.year }}</p>
            <p class="text-brand-grey-3">Color: {{ item.color }}</p>
          </div>
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

    const currentPage = ref(1);
    const pageSize = 20;

    const searchGalleryData = async () => {
      galleryData.value = [];
      currentPage.value = 1;
      await fetchGalleryData();
    };

    // Fetch gallery data from Supabase based on user and filter criteria
    const fetchGalleryData = async () => {
      let query = supabase
        .from("cars")
        .select("*")
        .eq("user", user._rawValue.id);

      if (brandFilter.value !== "") {
        query = query.ilike("brand", `%${brandFilter.value}%`);
      }
      if (modelFilter.value !== "") {
        query = query.ilike("model", `%${modelFilter.value}%`);
      }
      if (yearFilter.value !== "") {
        query = query.eq("year", yearFilter.value);
      }
      if (colorFilter.value !== "") {
        query = query.ilike("color", `%${colorFilter.value}%`);
      }

      let { data: cars, error } = await query
        .order("created_at", { ascending: false })
        .range(
          (currentPage.value - 1) * pageSize,
          currentPage.value * pageSize - 1
        );

      if (error) {
        console.error(error);
      } else {
        galleryData.value = galleryData.value.concat(cars);
      }
    };

    const enlargeImage = (url) => {
      enlarged.value = url;
    };

    const filteredGalleryData = computed(() => {
      return galleryData.value;
    });

    //The handleScroll function is called whenever the user scrolls the window.
    //It checks if the user has scrolled to the bottom of the page and if so,
    //increments the currentPage variable and calls the fetchGalleryData function again to load the next page of data.
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        galleryData.value.length % pageSize === 0
      ) {
        currentPage.value++;
        fetchGalleryData();
      }
    };

    onMounted(async () => {
      await fetchGalleryData();
      window.addEventListener("scroll", handleScroll);
    });

    return {
      galleryData,
      brandFilter,
      modelFilter,
      yearFilter,
      colorFilter,
      filteredGalleryData,
      searchGalleryData,
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
