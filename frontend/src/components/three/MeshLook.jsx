import {
  PresentationControls,
  Stage,
  MeshReflectorMaterial,
} from "@react-three/drei";

import { useEffect, useState, React, Suspense, useRef } from "react";
import axios from "axios";
import TopPartMesh from "./Clothes/TopPartMesh";
import { ObjectLoader } from "three";
import { useLoader } from "@react-three/fiber";
import BottomPartMesh from "./Clothes/BottomPartMesh";
import TopMeshObject from "./Clothes/TopMeshObject";
import get_augmented_objects from "../../../api/augmented_objects/get_top_augmented_objects";
import ThreeControls from "./Controls";

export default function MeshedLook() {
  const bottomRef = useRef();
  const topRef = useRef();

  const [bottom_mesh_line, set_bottom_mesh_line] = useState(["Empty"]);
  const [bottom_mesh_len, set_bottom_mesh_len] = useState(
    bottom_mesh_line.length
  );
  const [top_mesh_line, set_top_mesh_line] = useState(["Empty"]);
  const [top_mesh_len, set_top_mesh_len] = useState(top_mesh_line.length);
  const [top_current, set_top_current] = useState([0]);
  const [bottom_current, set_bottom_current] = useState([0]);
  const [isBottomVisible, setIsBottomVisible] = useState(false);
  const [isTopVisible, setIsTopVisible] = useState(false);

  useEffect(() => {
    top_mesh_line[0] != "Empty" ? not_empty() : get_mesh_line("TOP");
    bottom_mesh_line[0] != "Empty" ? not_empty() : get_mesh_line("BM");
  }, []);

  const get_mesh_line = (wearable_part) => {
    wearable_part === "TOP" &&
      get_augmented_objects(wearable_part).then((res) => {
        set_top_mesh_line(res);
        set_top_mesh_len(res.length);
        setIsTopVisible(true);
      });
    wearable_part === "BM" &&
      get_augmented_objects(wearable_part).then((res) => {
        console.log(res)
        if(res.length > 0){
          set_bottom_mesh_line(res);
          set_bottom_mesh_len(res.length);
          setIsBottomVisible(true);
        }
        else{
          setIsBottomVisible(false);
        }
        
      });
  };

  const handleProgress = (progress) => {
    // console.log(progress);
  };

  const handleTopMeshChange = (updatedValue) => {
    set_top_current(updatedValue);
  };

  const handleBottomMeshChange = (updatedValue) => {
    set_bottom_current(updatedValue);
  };

  // obj.position.set(-0.8, 1, 0);

  return (
    <>
      <PresentationControls
        speed={1.5}
        global
        zoom={0.5}
        polar={[-0.1, Math.PI / 4]}
      >
        <Stage environment={"city"} intensity={0.1}>
          {isTopVisible ? (
            <mesh ref={topRef} position={[0, 6.3, 0]}>
              <ThreeControls
                index={top_current}
                title={top_mesh_line[top_current].title}
                buttons_positioning={[0, 0.7, 0]}
                text_positioning={[0, 0.7, 0]}
                handleMeshChange={handleTopMeshChange}
                limits={top_mesh_len}
              />
              <Suspense fallback={null}>
                <TopMeshObject
                  mesh_url={top_mesh_line[top_current].aug_model.aug_model}
                  mesh_texture_url={
                    top_mesh_line[top_current].aug_model.texture
                  }
                  handleProgress={handleProgress}
                />
              </Suspense>
            </mesh>
          ) : (
            <></>
          )}
          {isBottomVisible ? (
            <mesh ref={bottomRef} position={[0, 5, 0]}>
              <ThreeControls
                index={bottom_current}
                buttons_positioning={[0, 0.6, 0]}
                title={bottom_mesh_line[bottom_current].title}
                text_positioning={[0, -0.1, 0]}
                handleMeshChange={handleBottomMeshChange}
                limits={bottom_mesh_len}
              />
              <Suspense fallback={null}>
                <TopMeshObject
                  mesh_url={
                    bottom_mesh_line[bottom_current].aug_model.aug_model
                  }
                  mesh_texture_url={
                    bottom_mesh_line[bottom_current].aug_model.texture
                  }
                  handleProgress={handleProgress}
                />
              </Suspense>
            </mesh>
          ) : (
            <></>
          )}
        </Stage>
        {/*  
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={-0.005}>
          <planeGeometry args={[170, 170]} />
          <MeshReflectorMaterial
            blur={[300, 100]} // Blur ground reflections (width, height), 0 skips blur
            mixBlur={1} // How much blur mixes with surface roughness (default = 1)
            mixStrength={40} // Strength of the reflections
            roughness={1}
            resolution={2048} // Off-buffer resolution, lower=faster, higher=better quality, slower
            mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
            depthScale={1.2} // Scale the depth factor (0 = no depth, default = 0)
            minDepthThreshold={0.4} // Lower edge for the depthTexture interpolation (default = 0)
            // metalness={1} //
            color="#101010"
            maxDepthThreshold={1.4} // Upper edge for the depthTexture interpolation (default = 0)
            debug={
              0
            }  // Depending on the assigned value, one of the following channels is shown:
      //0 = no debug
      //1 = depth channel
      //2 = base channel
      //3 = distortion channel
      /4 = lod channel (based on the roughness)
    
            // reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
          />
        </mesh>*/}
      </PresentationControls>
    </>
  );
}
