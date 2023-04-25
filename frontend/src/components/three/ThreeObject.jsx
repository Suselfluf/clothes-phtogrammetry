import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { useState } from "react";

import { useEffect } from "react";
import axios from "axios";

import My3DObject from "./MeshObject";
import { ObjectLoader } from "three";

function ThreeObject(props) {
  const [objectJSON, setobjectJSON] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const recieveCloth = async (e) => {
  //   let url =
  //     "http://localhost:8000/media/AugModels/Cloth/trimed_black_coat.obj";
  //   axios
  //     .get(url)
  //     .then((res) => {
  //       setobjectJSON(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const showElements = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    recieveCloth();
    return () => {};
  }, []);

  return (
    <>
      <button onClick={showElements}></button>
      <Canvas>
        <PerspectiveCamera makeDefault position={(0, 0, 5)}></PerspectiveCamera>
        <OrbitControls></OrbitControls>
        <mesh position={1}>
          <sphereGeometry args={[1, 32, 32]}></sphereGeometry>
          <meshStandardMaterial color="#000000"></meshStandardMaterial>
        </mesh>

        {/* <button onClick={setIsLoaded}></button> */}

        {isLoaded ? <My3DObject jsonData={objectJSON}></My3DObject> : null}
        <mesh rotation={[0, 0, 0]}>
          <planeGeometry args={[7, 7]}></planeGeometry>
          <meshStandardMaterial color="#1ea3d8"></meshStandardMaterial>
        </mesh>
        <ambientLight args={["#ffffff", 1]}></ambientLight>
      </Canvas>
    </>
  );
}

export default ThreeObject;
