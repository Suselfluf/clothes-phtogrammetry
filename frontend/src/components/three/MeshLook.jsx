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

export default function MeshedLook() {
  const bottomRef = useRef();
  const topRef = useRef();
  const [isBottomVisible, setIsBottomVisible] = useState(true);
  const [isTopVisible, setIsTopVisible] = useState(true);

  useEffect(() => {}, []);

  return (
    <>
      <PresentationControls
        speed={1.5}
        global
        zoom={0.7}
        polar={[-0.1, Math.PI / 4]}
      >
        <Stage environment={"city"} intensity={0.6}>
          <Suspense fallback={null}>
            {isBottomVisible ? (
              <mesh ref={bottomRef}>
                <BottomPartMesh />
              </mesh>
            ) : (
              <></>
            )}
            {isTopVisible ? (
              <mesh ref={topRef}>
                <TopPartMesh />
              </mesh>
            ) : (
              <></>
            )}
          </Suspense>
        </Stage>
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
            } /* Depending on the assigned value, one of the following channels is shown:
      0 = no debug
      1 = depth channel
      2 = base channel
      3 = distortion channel
      4 = lod channel (based on the roughness)
    */
            // reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
          />
        </mesh>
      </PresentationControls>
    </>
  );
}
