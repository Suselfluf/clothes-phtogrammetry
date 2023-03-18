import React from "react";
import { TextureLoader } from "three";
import { BACKEND_MEDIA_URL } from "../../../const/ulrs";

export default async function SetUpTextures(texture_url) {
  const textureLoader = new TextureLoader();

  const load_texture = (texture_url) => {
    textureLoader.load(`${BACKEND_MEDIA_URL}${texture_url}`, (texture) => {
      return texture;
    });
  };

  const response = await load_texture(texture_url)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return error;
    });

  return response;
}
