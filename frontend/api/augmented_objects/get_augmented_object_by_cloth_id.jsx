import axios from "axios";
import React from "react";
import { BACKEND_CLOTHES_URL } from "../../src/const/ulrs";

export default async function get_augmented_object_by_cloth_id(cloth_id) {
  var config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BACKEND_CLOTHES_URL}/${cloth_id}/augmented-clothes`,
  };

  const response = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });

  return response;
}
