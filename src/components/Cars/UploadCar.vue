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
        <select
          id="brand"
          v-model="form.brand"
          class="bg-gray-200 p-2 rounded-lg w-full"
          required
        >
          <option v-for="brand in brands" :key="brand.maker">
            {{ brand.maker }}
          </option>
        </select>
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
//in this component composition API did nto work correctly so Options API it is
import useAuthUser from "@/composables/UseAuthUser.js";
import useSupabase from "@/composables/UseSupabase.js";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "UploadForm",
  data() {
    return {
      brands: [],
      form: {
        brand: "",
        model: "",
        color: "",
        year: null,
        url: "https://izptjbyyibydlsfuaujz.supabase.co/storage/v1/object/public/images/",
      },
      fileInput: null,
    };
  },
  async beforeMount() {
    const { supabase } = useSupabase();

    let { data: carmakers, error } = await supabase
      .from("car-makers")
      .select("maker");
    if (error) {
      console.error(error);
    } else {
      this.brands = carmakers;
    }
  },
  mounted() {
    this.fileInput = document.querySelector("input[type=file]");
  },
  methods: {
    async uploadImage() {
      const file = this.fileInput.files[0];
      const { user } = useAuthUser();
      const { supabase } = useSupabase();

      const response = await supabase.storage
        .from("images")
        .upload(user._rawValue.id + "/" + uuidv4(), file);
      this.form.url = this.form.url + response.data.path;
    },
    async submitForm() {
      const { user } = useAuthUser();
      const formData = { ...this.form, user: user._rawValue.id };
      const { supabase } = useSupabase();
      const { data, error } = await supabase.from("cars").insert(formData);
      if (data) {
        console.log("Upload successful");
      } else {
        console.log(error);
      }
    },
  },
};
</script>
