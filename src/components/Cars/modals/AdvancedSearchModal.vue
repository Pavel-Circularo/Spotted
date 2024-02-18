<template>
  <div class="my-10 flex items-center justify-center gap-4 mx-5">
    <div class="flex flex-col gap-4">
      <input
        v-model="brand"
        type="text"
        placeholder="Brand"
        class="border-gray-400 border-2 rounded-lg p-2 shadow-brand-green-1 shadow-md bg-brand-white-1"
      />
      <input
        v-model="model"
        type="text"
        placeholder="Model"
        class="border-gray-400 border-2 rounded-lg p-2 shadow-brand-green-1 shadow-md bg-brand-white-1"
      />
      <input
        v-model="year"
        type="text"
        placeholder="Year"
        class="border-gray-400 border-2 rounded-lg p-2 shadow-brand-green-1 shadow-md bg-brand-white-1"
      />
      <input
        v-model="color"
        type="text"
        placeholder="Color"
        class="border-gray-400 border-2 rounded-lg p-2 shadow-brand-green-1 shadow-md bg-brand-white-1"
      />
      <button
        class="shadow-brand-green-1 shadow-md text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-md px-6 py-2.5 text-center"
        @click="submit"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: {
    modelValue: Boolean,
  },
  emits: ["update:modelValue", "search"],
  setup(props, { emit }) {
    const show = ref(props.modelValue);
    const brand = ref("");
    const model = ref("");
    const year = ref("");
    const color = ref("");

    // Watch for changes in modelValue prop and update show accordingly
    watch(
      () => props.modelValue,
      (newValue) => {
        show.value = newValue;
      }
    );

    const submit = () => {
      emit("search", {
        brand: brand.value,
        model: model.value,
        year: year.value,
        color: color.value,
      });
      emit("update:modelValue", false); // Close modal
    };

    return { show, brand, model, year, color, submit };
  },
};
</script>
