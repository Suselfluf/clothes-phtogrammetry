import React from "react";
import axios from "axios";
import { BACKEND_CLOTHES_URL } from "../../src/const/ulrs";

export default async function cloth_get_list() {
  var config = {
    method: "get",
    maxBodyLength: Infinity,
    url: BACKEND_CLOTHES_URL,
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
