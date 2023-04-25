import axios from "axios";
import React from "react";
import { BACKEND_CLOTHES_URL } from "../../src/const/ulrs";
import tokenInstance from "../tokens/axios";
export default async function update_augmented_object_by_cloth_id(cloth_id) {
  const response = await tokenInstance
    .put(`clothes-admin/${cloth_id}/augmented-clothes`, {
      //   access_token: localStorage.getItem("access_token"),
      folder_name: "folder_name_srting",
      // wearable_part: wearable_part,
    })
    .then((res) => {
      return res.data;
    });
  return response;
}

// export default async function get_augmented_objects(wearable_part) {
//   const response = await tokenInstance
//     .put(`clothes-admin/${cloth_id}/augmented-clothes`, {
//       //   access_token: localStorage.getItem("access_token"),
//       // wearable_part: wearable_part,
//     })
//     .then((res) => {
//       return res.data;
//     });
//   return response;
// }
