import { useLoader } from "@react-three/fiber";
import React from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { TextureLoader } from "three";
import { BACKEND_MEDIA_URL } from "../../../const/ulrs";
import { useEffect } from "react";

function BottomPartMesh() {
  const obj = useLoader(
    OBJLoader,
    BACKEND_MEDIA_URL + "/AugModels/Cloth2/texturedMesh_3.obj"
  );

  // const normal = useLoader(
  //   TextureLoader,
  //   BACKEND_MEDIA_URL + "/coverimages/Cloth/Black_coat_texture.jpg"
  // );

  useEffect(() => {
    // obj.scale.set(0.5, 0.5, 0.5);
    obj.position.set(0.35, -0.3, 0);
  }, [obj]);

  return <primitive object={obj} />;
  // return <></>;
}

export default BottomPartMesh;
