import { useLoader } from "@react-three/fiber";
import React from "react";
import { useState } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { TextureLoader } from "three";
import { BACKEND_MEDIA_URL, BACKEND_URL } from "../../../const/ulrs";

import { useEffect } from "react";

function AdminClothLook(props) {
  const [progress, set_progress] = useState(0);

  const onProgress = (xhr) => {
    const percentage = (xhr.loaded / xhr.total) * 100;
    set_progress(percentage);
    console.log("Progressing : ", percentage);
  };

  const obj = useLoader(
    OBJLoader,
    // BACKEND_MEDIA_URL + "/AugModels/Black_coat/Black_coat_mesh_JoafTgv.obj"
    BACKEND_URL + props.mesh_url,
    // onProgress

    // called when loading has errors
    (error) => {
      console.log("An error happened:", error);
    },
    (xhr) => {
      props.handleProgress(xhr);

      // update parent react component to display loading percentage
      // this.props.onProgress(loadingPercentage);
    }
  );

  useEffect(() => {
    console.log(props.mesh_url);
    // obj.scale.set(0.5, 0.5, 0.5);
    obj.position.set(-0.8, 1, 0);
  }, [obj]);

  return (
    <>
      <primitive object={obj} />
    </>
  );
  // return <></>;
}

export default AdminClothLook;
