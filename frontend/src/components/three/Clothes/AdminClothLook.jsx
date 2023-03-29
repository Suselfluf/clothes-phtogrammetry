import { useLoader } from "@react-three/fiber";
import React from "react";
import { useState } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MeshStandardMaterial, TextureLoader, MeshBasicMaterial } from "three";
import { BACKEND_MEDIA_URL, BACKEND_URL } from "../../../const/ulrs";

import { useEffect } from "react";

function AdminClothLook(props) {
  const [progress, set_progress] = useState(0);
  const [mesh_texture, set_mesh_texture] = useState("");
  const [object, set_object] = useState("");
  const [texture1, texture2] = useLoader(
    TextureLoader,
    [
      `${BACKEND_URL}${props.mesh_texture_array[0].texture_images}`,
      `${BACKEND_URL}${props.mesh_texture_array[1].texture_images}`,
    ],
    (loader) => {
      loader.setCrossOrigin("");
    }
  );

  const onProgress = (xhr) => {
    const percentage = (xhr.loaded / xhr.total) * 100;
    set_progress(percentage);
    console.log("Progressing : ", percentage);
  };

  // const texture = useLoader(
  //   TextureLoader,
  //   `${BACKEND_URL}${props.mesh_texture_url}`
  // );

  const obj = useLoader(
    OBJLoader,
    BACKEND_URL + props.mesh_url,
    (error) => {
      console.log("An error happened:", error);
    },
    (xhr) => {
      props.handleProgress(xhr);
    }
  );

  // const material = new MeshStandardMaterial({
  //   map: texture,
  // });
  const material1 = new MeshStandardMaterial({
    map: texture1,
  });
  const material2 = new MeshStandardMaterial({
    map: texture2,
  });

  const combinedMaterial = new MeshBasicMaterial({
    map: texture1,
    alphaMap: texture2,
    transparent: false,
  });

  const geometry = obj.children[0].geometry;

  useEffect(() => {
    return () => {
      // obj.position.set(-0.8, 1, 0); // Some possitioning issues
    };
  }, []);

  return (
    <>
      <mesh geometry={geometry} material={combinedMaterial}></mesh>
    </>
  );
  // return <></>;
}

export default AdminClothLook;
