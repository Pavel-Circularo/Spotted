<template>
  <div v-if="user" class="container mx-auto px-6 p-10">
    <h2
      class="text-4xl flex font-bold text-center text-brand-white-1 mt-10 mb-11 md:text-4xl lg:text-6xl justify-center"
    >
      Account information
    </h2>
    <div class="container mx-auto px-4 py-8 md:py-16">
      <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
        <div class="bg-brand-white-1 rounded-lg shadow-md overflow-hidden">
          <div class="p-4 md:p-8">
            <h2
              class="text-brand-green-1 text-2xl font-medium mb-4 text-center"
            >
              Basic Info
            </h2>
            <p class="text-brand-green-1 mb-2">
              <strong>Name:</strong>
              {{ user.user_metadata.username }}
            </p>
            <p class="text-brand-green-1 mb-7">
              <strong>Email:</strong>
              {{ user.email }}
            </p>
            <div class="flex items-right flex-wrap mb-15">
              <router-link
                :to="{ name: 'ResetPassword' }"
                class="lg:mt-0 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
                >Reset password</router-link
              >
            </div>
          </div>
        </div>
        <div class="bg-brand-white-1 rounded-lg shadow-md overflow-hidden">
          <div class="p-4 md:p-8">
            <h2
              class="text-brand-green-1 text-2xl font-medium mb-4 text-center"
            >
              Garage Info
            </h2>
            <p class="text-brand-green-1 mb-2">
              <strong>Size of Garage:</strong>
              {{ garageSize }}
            </p>
            <p class="text-brand-green-1 mb-2">
              <strong>Most frequent brand:</strong>
              {{ freqBrand }}
            </p>
            <p class="text-brand-green-1 mb-2">
              <strong>Most frequent color:</strong>
              {{ freqColor }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useAuthUser from "@/composables/UseAuthUser.js";
import useSupabase from "@/composables/UseSupabase.js";

export default {
  name: "Gallery",
  setup() {
    const { user } = useAuthUser();
    const { supabase } = useSupabase();
    const garageSize = ref(0);
    const freqBrand = ref("");
    const freqColor = ref("");

    //Get count of cars
    const fetchGarageData = async () => {
      let { count, error } = await supabase
        .from("cars")
        .select("*", { count: "exact", head: true })
        .eq("user", user._rawValue.id);

      if (error) {
        console.error(error);
      } else {
        garageSize.value = count;
      }
    };

    //Get a string that represents the most frequent string in a column
    const fetchMostFrequent = async (columnName, resultVariable) => {
      let { data, error } = await supabase
        .from("cars")
        .select(columnName)
        .eq("user", user._rawValue.id);

      if (error) {
        console.error(error);
      } else {
        const counts = {};
        let mostFrequent = null;
        let highestCount = 0;

        data.forEach((item) => {
          const value = item[columnName].toLowerCase();

          if (counts[value]) {
            counts[value]++;
          } else {
            counts[value] = 1;
          }

          if (counts[value] > highestCount) {
            mostFrequent = value;
            highestCount = counts[value];
          }
        });

        mostFrequent =
          mostFrequent.charAt(0).toUpperCase() + mostFrequent.slice(1);
        resultVariable.value = mostFrequent;
      }
    };

    onMounted(async () => {
      await fetchGarageData();
      await fetchMostFrequent("brand", freqBrand);
      await fetchMostFrequent("color", freqColor);
    });
    return {
      garageSize,
      freqBrand,
      user,
      freqColor,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
