<template>
  <form
    class="bg-white p-6 rounded-b-lg shadow-md w-full max-w-lg"
    @submit.prevent="submitForm()"
  >
    <h1 class="text-3xl font-medium mb-6 text-center text-teal-600">
      Recognize car
    </h1>
    <div class="mb-4">
      <label class="block text-gray-700 font-medium mb-2" for="brand"
        >Upload image and let AI recognize your car</label
      >

      <input
        id="image"
        class="bg-gray-200 rounded-lg w-full shadow-md"
        type="file"
        accept=".png, .jpg"
        @change="onUpload"
      />
    </div>
    <div v-if="loading" class="flex justify-center items-center mt-5">
      <div
        class="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600"
      ></div>
    </div>

    <div v-if="carInfo">
      <p class="mb-2">
        <span class="text-gray-700 font-medium">Brand:</span>
        {{ carInfo.mmg[0].make_name }}
      </p>
      <p class="mb-2">
        <span class="text-gray-700 font-medium">Model:</span>
        {{ carInfo.mmg[0].model_name }}
      </p>
      <p class="mb-2">
        <span class="text-gray-700 font-medium">Year:</span>
        {{ carInfo.mmg[0].years }}
      </p>

      <p class="mb-2">
        <span class="text-gray-700 font-medium">Color:</span>
        {{ carInfo.color[0].name }}
      </p>
      <h2 class="text-2xl font-medium mb-3 text-center text-teal-600">
        Looks good? Add it to your garage!
      </h2>
      <div class="flex flex-col items-center">
        <button
          type="submit"
          class="mb-3 shadow-brand-green-1 shadow-md text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-3xl text-md px-6 py-2.5 text-center"
        >
          Add
        </button>
      </div>
    </div>
    <div
      v-if="alert.show"
      class="p-2 rounded-lg shadow-md w-full mb-2 text-center"
      :class="`${alert.type}`"
    >
      {{ alert.message }}
    </div>
  </form>
</template>

<script>
import { ref, onMounted, onBeforeMount } from "vue";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import useSupabase from "@/composables/UseSupabase.js";
import useAuthUser from "@/composables/UseAuthUser.js";

export default {
  setup() {
    const carInfo = ref(null);
    const generatedPath = ref(null);
    const { supabase } = useSupabase();
    const { user } = useAuthUser();
    const form = ref({
      brand: "",
      model: "",
      color: "",
      year: null,
      url: `https://izptjbyyibydlsfuaujz.supabase.co/storage/v1/object/public/images/`,
    });
    const fileInput = ref(null);
    const alert = ref({
      show: false,
      message: "",
      type: "",
    });
    const loading = ref(false);

    const showAlert = ({ message, type }) => {
      alert.value = { show: true, message, type };
    };

    onMounted(() => {
      fileInput.value = document.querySelector("input[type=file]");
    });

    onBeforeMount(() => {
      generatedPath.value = `${user._rawValue.id}/${uuidv4()}`;
      form.value.url += generatedPath.value;
    });

    async function uploadImage() {
      const file = fileInput.value.files[0];
      const response = await supabase.storage
        .from("images")
        .upload(generatedPath.value, file);
      if (response.error) {
        console.log(response.error);
      }
    }

    async function recognizeCar(file) {
      loading.value = true;
      const formData = new FormData();
      formData.append("image", file);
      const url = "http://sallient.pythonanywhere.com/upload";

      try {
        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "api-key": process.env.VUE_APP_MY_API_KEY,
          },
        });
        loading.value = false;

        if (
          response.data.is_success &&
          response.data.detections[0].mmg.length
        ) {
          carInfo.value = response.data.detections[0];
          form.value.brand = carInfo.value.mmg[0].make_name;
          form.value.model = carInfo.value.mmg[0].model_name;
          form.value.year = carInfo.value.mmg[0].years;
          form.value.color = carInfo.value.color[0].name;
        } else {
          showAlert({
            message: "Could not recognize car",
            type: "bg-red-500 text-white",
          });
        }
      } catch (error) {
        loading.value = false;
        showAlert({
          message: "Error during recognition",
          type: "bg-red-500 text-white",
        });
      }
    }

    async function onUpload() {
      carInfo.value = null;
      alert.value.show = false;
      uploadImage();
      const file = fileInput.value.files[0];
      recognizeCar(file);
    }

    async function submitForm() {
      const formData = { ...form.value, user: user._rawValue.id };
      const response = await supabase.from("cars").insert(formData);
      if (response.status === 201) {
        showAlert({
          message: "Upload successful",
          type: "bg-green-500 text-white bold",
        });
      } else {
        showAlert({ message: "Upload failed", type: "bg-red-500 text-white" });
      }
    }

    return {
      form,
      carInfo,
      onUpload,
      fileInput,
      alert,
      showAlert,
      submitForm,
      generatedPath,
      uploadImage,
      loading,
    };
  },
};
</script>
