<template>
  <div
    v-if="alert.show"
    class="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-md w-full max-w-md"
    :class="`${alert.type}`"
  >
    {{ alert.message }}
  </div>
  <div class="flex flex-col items-center justify-center my-14 md:mx-0 mx-5">
    <div class="justify-center w-full max-w-lg">
      <button
        type="button"
        :class="{
          'w-1/2 text-xl rounded-tl-lg py-2': true,
          'bg-white border-b-0': isUploadComponent,
          'bg-gray-200 border-b border-gray-300': !isUploadComponent,
          'text-gray-900': isUploadComponent,
          'text-gray-500': !isUploadComponent,
        }"
        @click="toggleComponent(true)"
      >
        Upload
      </button>
      <button
        type="button"
        :class="{
          'w-1/2 text-xl rounded-tr-lg py-2': true,
          'bg-white border-b-0': !isUploadComponent,
          'bg-gray-200 border-b border-gray-300 ': isUploadComponent,
          'text-gray-900': !isUploadComponent,
          'text-gray-500': isUploadComponent,
        }"
        @click="toggleComponent(false)"
      >
        Recognize
      </button>
    </div>

    <form
      v-if="isUploadComponent"
      class="bg-white p-6 rounded-b-lg shadow-md w-full max-w-lg"
      @submit.prevent="submitForm(form)"
    >
      <h1 class="text-3xl font-medium mb-6 text-center text-teal-600">
        Add a car to your garage
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
          maxlength="20"
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
          maxlength="20"
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
          class="bg-gray-200 rounded-lg w-full shadow-md"
          type="file"
          accept=".png, .jpg"
          @change="uploadImage"
        />
      </div>
      <div class="flex items-center justify-center">
        <button
          type="submit"
          class="shadow-brand-green-1 shadow-md text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 sm:px-6 sm:py-2.5 text-center text-md px-4 font-medium py-2 rounded-l-3xl"
        >
          Add
        </button>
        <button
          type="reset"
          class="shadow-brand-green-1 shadow-md text-white bg-gradient-to-r from-red-400 via-red-500 to-orange-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 sm:px-6 sm:py-2.5 text-center text-md px-4 font-medium py-2 rounded-r-3xl"
          @click="resetForm()"
        >
          Reset
        </button>
      </div>
    </form>
    <RecognizeCarVue v-else :submit-form="submitForm" />
  </div>
</template>

<script>
//in this component composition API did not work correctly so Options API it is
import useAuthUser from "@/composables/UseAuthUser.js";
import useSupabase from "@/composables/UseSupabase.js";
import { v4 as uuidv4 } from "uuid";
import RecognizeCarVue from "@/components/Cars/RecognizeCar.vue";

export default {
  name: "UploadForm",
  components: {
    RecognizeCarVue,
  },
  data() {
    return {
      isUploadComponent: true,
      brands: [],
      user: "",
      generatedPath: "",
      form: {
        brand: "",
        model: "",
        color: "",
        year: null,
        url: `https://izptjbyyibydlsfuaujz.supabase.co/storage/v1/object/public/images/`,
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
    this.user = useAuthUser();
    this.generatedPath = this.user.user.id + "/" + uuidv4();
    this.form.url += this.generatedPath;
  },
  mounted() {
    this.fileInput = document.querySelector("input[type=file]");
  },
  methods: {
    toggleComponent() {
      this.isUploadComponent = !this.isUploadComponent;
    },
    async uploadImage() {
      const file = this.fileInput.files[0];
      //const { user } = useAuthUser();
      const { supabase } = useSupabase();

      // eslint-disable-next-line no-unused-vars
      const response = await supabase.storage
        .from("images")
        .upload(this.generatedPath, file);
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
      if (
        this.form.model !== "" &&
        !/^[a-zA-Z0-9 .-]+$/.test(this.form.model)
      ) {
        errors.push(
          "Model can only contain letters, numbers, dots, and hyphens"
        );
      }
      if (!this.form.color.trim()) {
        errors.push("Color is required");
      } else if (!/^[a-zA-Z0-9 ]+$/.test(this.form.color)) {
        errors.push("Color can only contain letters and spaces");
      }
      if (
        this.form.year !== null &&
        (isNaN(this.form.year) ||
          this.form.year < 1900 ||
          this.form.year > new Date().getFullYear())
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
          this.showAlert("Upload successful", "bg-green-500 text-white");
          this.resetForm();
        } else {
          this.showAlert("Upload failed", "bg-red-500 text-white");
          console.log(response.error);
        }
      } catch (error) {
        console.error(error);
        this.showAlert("Upload failed", "bg-red-500 text-white");
      }
    },
    /* async submitForm(form) {
      const { user } = useAuthUser();
      const formData = { ...form, user: user._rawValue.id };
      const { supabase } = useSupabase();
      const response = await supabase.from("cars").insert(formData);
      let statusCode = response.status;
      if (statusCode == 201) {
        this.showAlert("Upload successful", "bg-green-500 text-white");
        //this.resetForm();
      } else {
        this.showAlert("Upload failed", "bg-red-500 text-white");
        console.log(response.error);
      }
    }, */
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
