import {
  PresentationControls,
  Stage,
  MeshReflectorMaterial,
} from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import { useEffect, useState, React, Suspense, useRef } from "react";
import axios from "axios";
import AdminClothLook from "../Clothes/AdminClothLook";
import { Mesh } from "three";
import { ObjectLoader } from "three";
import { useLoader } from "@react-three/fiber";
import BottomPartMesh from "../Clothes/BottomPartMesh";

export default function AdminMeshedLookBox(props) {
  const bottomRef = useRef();
  const topRef = useRef();
  const [mesh_url, set_mesh_url] = useState(props.mesh_url);

  useEffect(() => {}, []);

  const handleProgress = (xhr) => {
    const loadingPercentage = Math.ceil((xhr.loaded / xhr.total) * 100);
    // console.log(loadingPercentage + "% loaded");   // Progress value
  };

  return (
    <>
      <PresentationControls
        speed={1.5}
        global
        zoom={0.7}
        polar={[-0.1, Math.PI / 4]}
      >
        <Stage environment={"city"} intensity={0.6}>
          <Suspense // Needed to be reworked to handle the gap while loading the object
            fallback={
              // <mesh position={props.position} rotation={props.rotation}>
              //   <boxBufferGeometry args={[1, 1, 1]} />
              //   <meshStandardMaterial color={props.color} />
              // </mesh>
              null
            }
          >
            <mesh ref={topRef}>
              <AdminClothLook
                mesh_url={mesh_url}
                handleProgress={handleProgress}
              />
            </mesh>
          </Suspense>
        </Stage>
      </PresentationControls>
    </>
  );
}
