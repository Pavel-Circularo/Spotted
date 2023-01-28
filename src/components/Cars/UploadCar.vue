<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <form
      class="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
      @submit.prevent="submitForm()"
    >
      <h1 class="text-lg font-medium mb-4">Add a Car</h1>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="brand"
          >Brand</label
        >
        <input
          id="brand"
          v-model="form.brand"
          class="bg-gray-200 p-2 rounded-lg w-full"
          type="text"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="model"
          >Model</label
        >
        <input
          id="model"
          v-model="form.model"
          class="bg-gray-200 p-2 rounded-lg w-full"
          type="text"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="color"
          >Color</label
        >
        <input
          id="color"
          v-model="form.color"
          class="bg-gray-200 p-2 rounded-lg w-full"
          type="text"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="year"
          >Year</label
        >
        <input
          id="year"
          v-model="form.year"
          class="bg-gray-200 p-2 rounded-lg w-full"
          type="text"
          required
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="image"
          >Image</label
        >
        <input
          id="image"
          class="bg-gray-200 p-2 rounded-lg w-full"
          type="file"
          required
          @change="uploadImage"
        />
      </div>
      <button
        class="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600"
        type="submit"
      >
        Add Car
      </button>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import useSupabase from "@/composables/UseSupabase.js";
import useAuthUser from "@/composables/UseAuthUser.js";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "UploadForm",
  setup() {
    const { user } = useAuthUser();

    const form = {
      brand: "",
      model: "",
      color: "",
      year: null,
      url: "https://izptjbyyibydlsfuaujz.supabase.co/storage/v1/object/public/images/",
    };

    const { supabase } = useSupabase();
    const fileInput = ref(null);

    const uploadImage = async () => {
      const file = fileInput.value.files[0];
      const response = await supabase.storage
        .from("images")
        .upload(user._rawValue.id + "/" + uuidv4(), file);
      form.url = form.url + response.data.path;
    };

    const submitForm = async () => {
      const formData = { ...form, user: user._rawValue.id };
      const { data, error } = await supabase.from("cars").insert(formData);
      if (data) {
        console.log("Upload successful");
      } else {
        console.log(error);
      }
    };

    onMounted(() => {
      fileInput.value = document.querySelector("input[type=file]");
    });
    return {
      form,
      fileInput,
      uploadImage,
      submitForm,
    };
  },
};
</script>
