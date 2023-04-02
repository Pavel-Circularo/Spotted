<template>
  <div
    v-if="alert.show"
    class="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-md w-full max-w-md"
    :class="`${alert.type}`"
  >
    {{ alert.message }}
  </div>
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
          :disabled="enableModel"
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
          type="number"
          min="1900"
          max="2100"
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
          accept=".png, .jpg"
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
//in this component composition API did not work correctly so Options API it is
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
      alert: {
        show: false,
        message: "",
        type: "",
      },
    };
  },
  computed: {
    enableModel() {
      return this.form.brand.trim() === "";
    },
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
    showAlert(message, type) {
      this.alert.message = message;
      this.alert.type = type;
      this.alert.show = true;

      setTimeout(() => {
        this.alert.show = false;
      }, 3000);
    },
    async submitForm() {
      const { user } = useAuthUser();
      const formData = { ...this.form, user: user._rawValue.id };
      const { supabase } = useSupabase();
      const response = await supabase.from("cars").insert(formData);
      let statusCode = response.status;
      if (statusCode == 201) {
        this.form.brand = "";
        this.form.model = "";
        this.form.color = "";
        this.form.year = null;
        this.fileInput = null;
        this.showAlert("Upload successful", "bg-green-500 text-white");
      } else {
        this.showAlert("Upload failed", "bg-red-500 text-white");
        console.log(response.error);
      }
    },
  },
};
</script>
