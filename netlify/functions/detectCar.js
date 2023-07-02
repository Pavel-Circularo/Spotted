const axios = require("axios");

exports.handler = async function (event) {
  try {
    const { image } = JSON.parse(event.body);
    const formData = new FormData();
    formData.append("image", image);

    const url =
      "https://api.carnet.ai/v2/mmg/detect?box_offset=0&box_min_width=180&box_min_height=180&box_min_ratio=1&box_max_ratio=3.15&box_select=center&region=DEF";

    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "application/octet-stream",
        "api-key": "ed4a48c9-edbc-443c-bc1e-703a831b5bbc",
      },
    });

    if (response.status === 200) {
      return {
        statusCode: 200,
        body: JSON.stringify(response.data),
      };
    } else {
      throw new Error("An error occurred");
    }
  } catch (error) {
    console.log(error);
    return {
      statusCode: error.response ? error.response.status : 500,
      body: error.message,
    };
  }
};
