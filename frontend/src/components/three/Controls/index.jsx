import { Text, Text3D } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { MeshStandardMaterial } from "three";
import { Canvas } from "@react-three/fiber";
import { useRef } from "react";
import Arrow from "./Arrow";
import React from "react";
import { useState, useEffect } from "react";
export default function ThreeControls(props) {
  const [index, set_index] = useState(0);
  const [button_possitioning, set_button_possitioning] = useState(
    props.buttons_positioning
  );
  const [text_positioning, set_text_positioning] = useState(
    props.text_positioning
  );
  const [arrowGeometry, setArrowGeometry] = useState(null);

  const [arrow_geometry, set_arrow_geometry] = useState("");
  const [is_arrow_loaded, set_is_arrow_loaded] = useState(false);
  const gltf_loader = new GLTFLoader();
  //   buttons_positioning={[0,1.2,0]}
  //                   text_positioning={[0,1.2,0]}

  const next = () => {
    set_index(index + 1);
    props.handleMeshChange(index + 1);
  };

  const prev = () => {
    set_index(index - 1);
    props.handleMeshChange(index - 1);
  };

  useEffect(() => {
    return () => {};
  }, []);

  const handleArrowClick = (event) => {
    console.log("Working");
  };

  return (
    <>
      <mesh position={text_positioning}>
        <Text fontSize={0.5}>
          {index}
          {/* <meshNormalMaterial /> */}
        </Text>
      </mesh>

      <mesh position={button_possitioning}>
        <Arrow
          setArrowGeometry={setArrowGeometry}
          direction={"left"}
          handleArrowClick={prev}
        />

        <Arrow
          setArrowGeometry={setArrowGeometry}
          direction={"next"}
          handleArrowClick={next}
        />
      </mesh>
    </>
  );
}