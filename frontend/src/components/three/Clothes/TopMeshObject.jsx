import { useLoader } from "@react-three/fiber";
import React from "react";
import { useState } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MeshStandardMaterial, TextureLoader } from "three";
import { BACKEND_MEDIA_URL, BACKEND_URL } from "../../../const/ulrs";

import { useEffect } from "react";

function TopMeshObject(props) {
  const [progress, set_progress] = useState(0);
  const [mesh_texture, set_mesh_texture] = useState("");
  const [object, set_object] = useState("");
  const textureLoader = new TextureLoader();

  const onProgress = (xhr) => {
    const percentage = (xhr.loaded / xhr.total) * 100;
    set_progress(percentage);
    console.log("Progressing : ", percentage);
  };

  const texture = useLoader(
    TextureLoader,
    `${BACKEND_URL}${props.mesh_texture_url}`
  );

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

  const material = new MeshStandardMaterial({
    map: texture,
  });

  const geometry = obj.children[0].geometry;

  useEffect(() => {
    return () => {
      // obj.scale.set(0.5, 0.5, 0.5);
      //   obj.position.set(-0.8, 1, 0);
    };
  }, []);

  return (
    <>
      {/* <primitive object={obj} material={mesh_texture} /> */}
      <mesh
        geometry={geometry}
        material={material}
        position={[0, 0, 0]}
        rotateX={1}
      />
    </>
  );
  // return <></>;
}

export default TopMeshObject;
