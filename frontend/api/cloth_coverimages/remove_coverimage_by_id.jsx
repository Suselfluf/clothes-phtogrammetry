import axios from "axios";
import React from "react";
import { BACKEND_CLOTHES_URL } from "../../src/const/ulrs";

export default async function remove_coverimage_by_id(image_id, data) {
  var config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: BACKEND_CLOTHES_URL + `/${id}/coverimages`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
  };
  console.log(config);

  // const response = await axios(config)
  //   .then(function (response) {
  //     return response.data;
  //   })
  //   .catch(function (error) {
  //     return error;
  //   });

  // return response;
}
