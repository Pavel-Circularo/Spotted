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
      class="bg-brand-white-1 p-6 rounded-lg shadow-md w-full max-w-lg"
      @submit.prevent="submitForm()"
    >
      <h1 class="text-3xl font-medium mb-6 text-center text-teal-600">
        Add a car to your collection
      </h1>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="brand"
          >Brand</label
        >
        <select
          id="brand"
          v-model="form.brand"
          class="bg-gray-200 p-2 rounded-lg w-full shadow-md"
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
          class="bg-gray-200 p-2 rounded-lg w-full shadow-md"
          type="text"
          :disabled="enableModel"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="color"
          >Color</label
        >
        <input
          id="color"
          v-model="form.color"
          class="bg-gray-200 p-2 rounded-lg w-full shadow-md"
          type="text"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="year"
          >Year</label
        >
        <input
          id="year"
          v-model="form.year"
          class="bg-gray-200 p-2 rounded-lg w-full shadow-md"
          type="number"
          min="1900"
          max="2100"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-medium mb-2" for="image"
          >Image</label
        >
        <input
          id="image"
          class="bg-gray-200 p-2 rounded-lg w-full shadow-md"
          type="file"
          accept=".png, .jpg"
          @change="uploadImage"
        />
      </div>
      <div class="flex items-center justify-center">
        <button
          type="submit"
          class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2"
        >
          Add
        </button>
        <button
          type="reset"
          class="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center mr-2"
          @click="resetForm()"
        >
          Reset
        </button>
      </div>
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
    hasFile() {
      return this.fileInput !== null;
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
      // validate form inputs
      const errors = [];
      if (!this.form.brand.trim()) {
        errors.push("Brand is required");
      }
      if (!this.form.model.trim()) {
        errors.push("Model is required");
      } else if (!/^[a-zA-Z ]+$/.test(this.form.model)) {
        errors.push("Model can only contain letters and spaces");
      }
      if (!this.form.color.trim()) {
        errors.push("Color is required");
      } else if (!/^[a-zA-Z ]+$/.test(this.form.color)) {
        errors.push("Color can only contain letters and spaces");
      }
      if (
        !this.form.year ||
        this.form.year < 1900 ||
        this.form.year > new Date().getFullYear()
      ) {
        errors.push("Year must be a number between 1900 and the current year");
      }
      if (
        !this.fileInput ||
        !this.fileInput.files ||
        !this.fileInput.files[0]
      ) {
        errors.push("Image is required");
      }

      // handle validation errors
      if (errors.length > 0) {
        this.showAlert(errors.join("; "), "bg-red-500 text-white");
        return;
      }

      // submit form data
      try {
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
      } catch (error) {
        console.error(error);
        this.showAlert("Upload failed", "bg-red-500 text-white");
      }
    },
    resetForm() {
      this.form.brand = "";
      this.form.model = "";
      this.form.color = "";
      this.form.year = null;
      this.fileInput = null;
      window.location.reload();
    },
  },
};
</script>
<style>
input[type="file"]::-webkit-file-upload-button {
  background-color: #e0eaef;
  color: #012f41;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #80868b;
  font-size: 0.9rem;
  cursor: pointer;
}
</style>