import React from "react";
import axios from "axios";
import { BACKEND_CLOTHES_URL } from "../../src/const/ulrs";
import tokenInstance from "../tokens/axios";

export default async function get_user_data() {
  const response = await tokenInstance
    .get(`user-auth/identify/`, {
      access_token: localStorage.getItem("access_token"),
    })
    .then((res) => {
      return res.data;
      //   return res.data;
    });
  return response;
}
