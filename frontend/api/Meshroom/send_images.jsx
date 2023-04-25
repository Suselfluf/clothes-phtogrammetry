import axios from "axios";
import tokenInstance from "../tokens/axios";
import React from "react";

export default async function send_images(url, data, method) {
  var config = {
    method: "post",
    // method: method,
    maxBodyLength: Infinity,
    url: url,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
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


