import axios from "axios";
import React from "react";

export default async function get_cloth_coverimages(url) {
  var config = {
    method: "get",
    maxBodyLength: Infinity,
    url: url,
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
