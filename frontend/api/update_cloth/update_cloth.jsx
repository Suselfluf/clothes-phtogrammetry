import React from "react";
import axios from "axios";
import { BACKEND_CLOTHES_URL } from "../../src/const/ulrs";

export default async function update_cloth_by_id(
  id,
  title,
  description,
  wearable_parts
) {
  var formdata = new FormData();
  formdata.append("title", title);
  formdata.append("description", description);
  formdata.append("wearable_parts", wearable_parts);

  var config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${BACKEND_CLOTHES_URL}/${id}`,
    // headers: {
    //   Cookie: "csrftoken=XRgOykjULWZPmRcoI6dKECFtCO4FcWFN",
    // },
    data: formdata,
  };

  const responce = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });
  return responce;
}
