<!-- src/components/SearchInput.vue -->

<template>
  <div class="relative flex-grow">
    <input
      v-model="internalSearch"
      type="text"
      placeholder="Search for a car"
      class="w-full border-gray-400 border-2 rounded-3xl p-2 pl-6 shadow-brand-green-1 shadow-md bg-brand-white-1 focus:ring-2 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium text-md"
      @input="updateSearch"
    />
    <button
      type="button"
      class="h-full p-2 absolute top-1/2 right-2 transform -translate-y-1/2 border-l-2 border-gray-400 text-gray font-medium text-gray-600 hover:text-teal-400"
      @click="toggleFilters"
    >
      Advanced
    </button>
  </div>
</template>

<script>
import { ref, watch } from "vue";
export default {
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue", "toggle-filters"],
  setup(props, { emit }) {
    const internalSearch = ref(props.modelValue);

    // Watch for external changes to modelValue and update internal value
    watch(
      () => props.modelValue,
      (newValue) => {
        internalSearch.value = newValue;
      }
    );

    // Emit update event for v-model binding in parent
    const updateSearch = () => {
      emit("update:modelValue", internalSearch.value);
    };

    // Emit an event to toggle filters visibility in parent
    const toggleFilters = () => {
      emit("toggle-filters");
    };

    return {
      internalSearch,
      updateSearch,
      toggleFilters,
    };
  },
};
</script>
