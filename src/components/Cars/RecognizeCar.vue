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
    </div>
    <div
      v-if="alert.show"
      class="p-2 rounded-lg shadow-md w-full mb-2 text-center"
      :class="`${alert.type}`"
    >
      {{ alert.message }}
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import { ref, onMounted, onBeforeMount } from "vue";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import useSupabase from "@/composables/UseSupabase.js";
import useAuthUser from "@/composables/UseAuthUser.js";

export default {
  /* props: {
    submitForm: {
      type: Function,
      required: true,
    },
  }, */
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
    const showAlert = (message, type) => {
      alert.value.message = message;
      alert.value.show = true;
      alert.value.type = type;
    };
    /* const submitRecognizeForm = () => {
      props.submitForm(form);
    }; */
    onMounted(() => {
      fileInput.value = document.querySelector("input[type=file]");
    });
    onBeforeMount(() => {
      generatedPath.value = user._rawValue.id + "/" + uuidv4();
      form.value.url += generatedPath.value;
    });
    async function uploadImage() {
      const file = fileInput.value.files[0];

      // eslint-disable-next-line no-unused-vars
      const response = await supabase.storage
        .from("images")
        .upload(generatedPath.value, file);
    }
    async function onUpload() {
      alert.value.show = false;
      uploadImage();
      const file = fileInput.value.files[0];
      const formData = new FormData();
      formData.append("image", file);

      const url = "http://127.0.0.1:5000/upload";

      try {
        const response = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "api-key": process.env.VUE_APP_MY_API_KEY,
          },
        });
        if (response.data.is_success && response.data.detections.length) {
          carInfo.value = response.data.detections[0];
          form.value.brand = response.data.detections[0].mmg[0].make_name;
          form.value.model = response.data.detections[0].mmg[0].model_name;
          form.value.year = response.data.detections[0].mmg[0].years;
          form.value.color = response.data.detections[0].color[0].name;
        } else {
          showAlert("Could not recognize car");
        }
      } catch (error) {
        console.log(error);
        if (error.response.status !== 200) {
          showAlert("Error during recognition");
        }
      }
    }
    async function submitForm() {
      const formData = { ...form.value, user: user._rawValue.id };
      const response = await supabase.from("cars").insert(formData);
      let statusCode = response.status;
      if (statusCode == 201) {
        this.showAlert("Upload successful", "bg-green-500 text-white");
        //this.resetForm();
      } else {
        this.showAlert("Upload failed", "bg-red-500 text-white");
        console.log(response.error);
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
    };
  },
};
</script>
