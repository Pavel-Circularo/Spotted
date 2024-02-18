<template>
  <div class="container mx-auto">
    <h1
      class="text-4xl font-bold text-brand-white-1 my-10 text-center lg:text-6xl"
    >
      My Garage
    </h1>
    <div class="flex flex-wrap justify-center gap-2 mx-5 my-10">
      <div class="relative flex-grow">
        <SearchInput
          v-model="basicSearch"
          @toggle-filters="showFilters = !showFilters"
        />
      </div>

      <button
        class="ml-2 shadow-brand-green-1 shadow-md text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-3xl text-md px-6 py-2.5"
        @click="searchGalleryData"
      >
        Search
      </button>
      <button
        class="shadow-brand-green-1 shadow-md text-white bg-gradient-to-r from-red-400 via-red-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-3xl text-md px-6 py-2.5 text-center"
        @click="resetFilters"
      >
        Reset Filters
      </button>
    </div>

    <!-- Advanced search modal -->
    <GDialog v-model="showFilters" max-width="300">
      <AdvancedSearchModal
        v-model="showFilters"
        @search="handleAdvancedSearch"
      />
    </GDialog>

    <div v-if="filteredGalleryData.length == 0">
      <h1
        class="text-2xl font-bold text-brand-white-1 my-10 text-center lg:text-6xl"
      >
        No cars found
      </h1>
    </div>

    <div
      v-else
      class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mr-10 ml-10 md:mr-0 md:ml-0 mb-10"
    >
      <div v-for="item in filteredGalleryData" :key="item.id">
        <div class="rounded-lg shadow-lg shadow-brand-green-1">
          <img
            :src="item.url"
            :alt="item.brand"
            class="w-full object-cover rounded-t-lg h-36"
            @click="
              enlargeImage(
                item.id,
                item.brand,
                item.model,
                item.year,
                item.color,
                item.url
              );
              bigPicture = true;
            "
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

    <!-- Confirm modal -->
    <GDialog v-model="dialogState" max-width="500">
      <div class="wrapper text-black">
        <div class="content p-5">
          <div class="title text-2xl font-bold mb-5">Are you sure?</div>

          <p>Please note that this action is irreversible!</p>
        </div>

        <div class="actions flex justify-center pb-5">
          <button
            class="shadow-brand-green-1 shadow-md text-white bg-gradient-to-r from-red-400 via-red-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-3xl text-md px-6 py-2.5 text-center mr-2"
            @click="
              deleteCar();
              dialogState = false;
            "
          >
            Delete
          </button>
          <button
            class="shadow-brand-green-1 shadow-md text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-3xl text-md px-6 py-2.5 text-center ml-2"
            @click="dialogState = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </GDialog>

    <!-- Enlarge picture modal -->
    <GDialog v-model="bigPicture" max-width="90%" max-height="90%">
      <div
        class="wrapper fixed inset-0 bg-opacity-75 flex justify-center items-center z-50"
      >
        <div class="relative">
          <img
            :src="picData.url"
            class="max-h-screen max-w-screen rounded-lg shadow-lg"
          />
          <button
            class="absolute top-5 right-5 text-white shadow-brand-green-1 shadow-md bg-gradient-to-r from-red-400 via-red-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 text-center text-sm font-medium py-1 px-2 rounded-full"
            @click="bigPicture = false"
          >
            X
          </button>
          <div
            class="mt-3 absolute bottom-2 left-0 right-0 flex justify-center"
          >
            <div
              class="max-w-xl w-full bg-brand-white-1 p-4 rounded-lg shadow-lg shadow-brand-green-1 flex"
            >
              <div>
                <h2 class="text-lg font-bold text-brand-green-1">
                  {{ picData.brand }} {{ picData.model }}
                </h2>
                <p class="text-brand-grey-3">Year: {{ picData.year }}</p>
                <p class="text-brand-grey-3">Color: {{ picData.color }}</p>
              </div>
              <div class="ml-auto mt-4">
                <button
                  class="shadow-brand-green-1 shadow-md text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 sm:px-6 sm:py-2.5 text-center text-md px-4 font-medium py-2 rounded-l-3xl"
                  @click="editCar(picData)"
                >
                  Edit
                </button>
                <button
                  class="shadow-brand-green-1 shadow-md text-white bg-gradient-to-r from-red-400 via-red-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 sm:px-6 sm:py-2.5 text-center text-md px-4 font-medium py-2 rounded-r-3xl"
                  @click="
                    bigPicture = false;
                    passCarId(picData.id);
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GDialog>

    <!-- Edit car modal -->
    <GDialog v-model="editDialogState" max-width="100%" max-height="90%">
      <div
        class="wrapper fixed inset-0 bg-opacity-75 flex justify-center items-center z-50"
      >
        <div class="relative">
          <div
            class="max-w-2xl w-full bg-white p-6 rounded-lg shadow-lg shadow-brand-green-1"
          >
            <h2 class="text-3xl font-medium text-teal-600 mb-4 text-center">
              Edit car info
            </h2>
            <div class="mb-2">
              <label class="block text-gray-700 font-medium mb-1" for="brand">
                Brand
              </label>
              <input
                id="brand"
                v-model="editedCar.brand"
                class="bg-gray-200 p-2 rounded-lg w-full shadow-md"
                type="text"
              />
            </div>
            <div class="mb-2">
              <label class="block text-gray-700 font-medium mb-1" for="model">
                Model
              </label>
              <input
                id="model"
                v-model="editedCar.model"
                class="bg-gray-200 p-2 rounded-lg w-full shadow-md"
                type="text"
              />
            </div>
            <div class="mb-2">
              <label class="block text-gray-700 font-medium mb-1" for="year">
                Year
              </label>
              <input
                id="year"
                v-model="editedCar.year"
                class="bg-gray-200 p-2 rounded-lg w-full shadow-md"
                type="number"
              />
            </div>
            <div class="mb-4">
              <label class="block text-gray-700 font-medium mb-1" for="color">
                Color
              </label>
              <input
                id="color"
                v-model="editedCar.color"
                class="bg-gray-200 p-2 rounded-lg w-full shadow-md"
                type="text"
              />
            </div>
            <div class="flex justify-center">
              <button
                class="shadow-brand-green-1 shadow-md text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-3xl text-md px-6 py-2.5 text-center mr-2"
                @click="updateCar()"
              >
                Save
              </button>
              <button
                class="shadow-brand-green-1 shadow-md text-white bg-gradient-to-r from-red-400 via-red-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-3xl text-md px-6 py-2.5 text-center ml-2"
                @click="editDialogState = false"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </GDialog>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import useSupabase from "@/composables/UseSupabase.js";
import useAuthUser from "@/composables/UseAuthUser.js";
import SearchInput from "@/components/Cars/SearchInput.vue";
import AdvancedSearchModal from "@/components/Cars/modals/AdvancedSearchModal.vue";

export default {
  name: "Gallery",
  components: {
    SearchInput,
    AdvancedSearchModal,
  },
  setup() {
    // Gallery data + auth user
    const galleryData = ref([]);
    const { user } = useAuthUser();
    const { supabase } = useSupabase();

    // Search and filter variables
    const basicSearch = ref("");
    const brandFilter = ref("");
    const modelFilter = ref("");
    const yearFilter = ref("");
    const colorFilter = ref("");

    const currentPage = ref(1);
    const pageSize = 20;

    // Modal variables
    const dialogState = ref(false);
    const bigPicture = ref(false);
    const showFilters = ref(false);

    const picData = ref({});
    //const enlarged = ref(null);
    const carIdToDelete = ref(null);

    const editedCar = ref({
      id: null,
      brand: "",
      model: "",
      year: "",
      color: "",
      url: "",
    });

    const editDialogState = ref(false);

    const searchGalleryData = async () => {
      galleryData.value = [];
      currentPage.value = 1;
      await fetchGalleryData();
    };

    // Fetch gallery data from Supabase based on user and search/filter criteria
    const fetchGalleryData = async (filters = {}) => {
      let query = supabase.from("cars").select("*").eq("user", user.value.id);

      // Apply filters if they exist
      if (filters.brand) query = query.ilike("brand", `%${filters.brand}%`);
      if (filters.model) query = query.ilike("model", `%${filters.model}%`);
      if (filters.year) query = query.eq("year", filters.year);
      if (filters.color) query = query.ilike("color", `%${filters.color}%`);

      let { data: cars, error } = await query.order("created_at", {
        ascending: false,
      });

      if (error) {
        console.error(error);
      } else {
        galleryData.value = cars;
      }
    };

    const handleAdvancedSearch = (filters) => {
      fetchGalleryData(filters);
    };

    const editCar = (car) => {
      editedCar.value = { ...car };
      editDialogState.value = true;
    };

    const updateCar = async () => {
      try {
        const { error } = await supabase
          .from("cars")
          .update({
            brand: editedCar.value.brand,
            model: editedCar.value.model,
            year: editedCar.value.year,
            color: editedCar.value.color,
          })
          .eq("id", editedCar.value.id);

        if (error) {
          console.error("Error updating car:", error);
          alert("Error updating car. Please try again.");
          return;
        }

        alert("Car updated successfully!");
        searchGalleryData(); // Refresh the gallery data after updating
        editDialogState.value = false; // Close the edit dialog
        bigPicture.value = false; // Close the big picture dialog
      } catch (error) {
        console.error("Error updating car:", error);
        alert("An error occurred while updating the car. Please try again.");
      }
    };

    const passCarId = (id) => {
      carIdToDelete.value = id;
      dialogState.value = true;
    };

    const deleteCar = async () => {
      const id = carIdToDelete.value;
      try {
        const { error } = await supabase.from("cars").delete().eq("id", id);

        if (error) {
          console.error("Error deleting image:", error);
          alert("Error deleting image. Please try again.");
          return;
        }

        alert("Image deleted successfully!");
        searchGalleryData();
      } catch (error) {
        console.error("Error deleting image:", error);
        alert("An error occurred while deleting the image. Please try again.");
      }
    };

    const resetFilters = async () => {
      basicSearch.value = "";
      brandFilter.value = "";
      modelFilter.value = "";
      yearFilter.value = "";
      colorFilter.value = "";
      searchGalleryData();
    };

    const enlargeImage = (id, brand, model, year, color, url) => {
      picData.value = { id, brand, model, year, color, url };
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
      basicSearch,
      brandFilter,
      modelFilter,
      yearFilter,
      colorFilter,
      carIdToDelete,
      filteredGalleryData,
      searchGalleryData,
      passCarId,
      deleteCar,
      resetFilters,
      enlargeImage,
      picData,
      bigPicture,
      dialogState,
      showFilters,
      editDialogState,
      editCar,
      editedCar,
      updateCar,
      handleAdvancedSearch,
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
