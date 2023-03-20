import React from "react";
import axios from "axios";
import { BACKEND_CLOTHES_URL } from "../../src/const/ulrs";

export default async function cloth_create_new() {
  var data = new FormData();
  data.append("title", "New Cloth Title");
  data.append("description", "New Cloth Description");
  data.append("wearable_part", "TOP");

  var config = {
    method: "post",
    maxBodyLength: Infinity,
    url: BACKEND_CLOTHES_URL,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
    // headers: {
    //   Cookie: "csrftoken=XRgOykjULWZPmRcoI6dKECFtCO4FcWFN",
    // },
  };

  const responce = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
      //   console.log(error);
    });
  return responce;

  //   return <div>cloth_get_list</div>;
}
