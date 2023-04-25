import { VRButton, ARButton, XR, Controllers, Hands } from '@react-three/xr'
import { Canvas } from '@react-three/fiber'
import { XRButton } from '@react-three/xr'
import { WebGLRenderer } from 'three'


export default function Ar_entry() {
  return (
    <>
      <ARButton />
      <XRButton mode={"AR"}/>
      <Canvas>
        <XR>
          {/* <Controllers />
          <Hands /> */}
          <mesh>
            <boxGeometry />
            <meshBasicMaterial color="blue" />
          </mesh>
        </XR>
        
      </Canvas>
      
    </>
  )
}


