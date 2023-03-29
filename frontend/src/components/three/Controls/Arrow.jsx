import { useLoader } from "@react-three/fiber";
import { useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Arrow = (props) => {
  const gltf = useLoader(GLTFLoader, "lowpoly_short_arrow_copy.gltf");
  const [direction, set_direction] = useState(props.direction);

  const arrowGeometry = gltf.scene.children[0].children[0].children[0].geometry;
  //   setArrowGeometry(arrowGeometry);

  return (
    <>
      {/* <primitive object={obj} material={mesh_texture} /> */}
      {/* <mesh
        geometry={arrowGeometry}
        // material={material}
        scale={0.003}
        position={[-1, 0, 0.12]}
        rotation-y={3.2}
      /> */}
      {direction == "next" ? (
        <mesh
          onClick={props.handleArrowClick}
          geometry={arrowGeometry}
          // material={material}
          scale={0.003}
          position={[0.8, 0, -0.12]}
        />
      ) : (
        <mesh
          onClick={props.handleArrowClick}
          geometry={arrowGeometry}
          // material={material}
          scale={0.003}
          position={[-0.8, 0, 0]}
          rotation-y={3.1}
        />
      )}
    </>
  );
};

export default Arrow;
