import axios from "axios";
import React from "react";
import { BACKEND_CLOTHES_URL } from "../../src/const/ulrs";

export default async function get_converting_images_by_aug_model_id(id) {
  var config = {
    method: "get",
    maxBodyLength: Infinity,
    url: BACKEND_CLOTHES_URL + `/${id}/converting-images`,
  };
  // console.log(config);

  const response = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });

  return response;
}
