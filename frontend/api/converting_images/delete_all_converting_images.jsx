import axios from "axios";
import { BACKEND_CLOTHES_URL } from "../../src/const/ulrs";

export default async function delete_all_converting_images(data, cloth_id) {
  var config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: BACKEND_CLOTHES_URL + `/${cloth_id}/converting-images`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
  };

  //   const response = await axios(config)
  //     .then(function (response) {
  //       return response.data;
  //     })
  //     .catch(function (error) {
  //       return error;
  //     });

  //   return response;
}
