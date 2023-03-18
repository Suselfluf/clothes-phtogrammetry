import { useLoader } from "@react-three/fiber";
import React from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { TextureLoader } from "three";
import { BACKEND_MEDIA_URL } from "../../../const/ulrs";
import { useEffect } from "react";

function TopPartMesh() {
  const obj = useLoader(
    OBJLoader,
    BACKEND_MEDIA_URL + "/AugModels/Cloth/Black_coat_mesh.obj"
  );
  //127.0.0.1:8000/media/AugModels/Top_cloth/texturedMesh.obj
  // const normal = useLoader(
  //   TextureLoader,
  //   BACKEND_MEDIA_URL + "/coverimages/Cloth/Black_coat_texture.jpg"
  // );

  http: useEffect(() => {
    // obj.scale.set(0.5, 0.5, 0.5);
    console.log(obj);
    obj.position.set(-0.8, 1, 0);
  }, [obj]);

  return <primitive object={obj} />;
  // return <></>;
}

export default TopPartMesh;
