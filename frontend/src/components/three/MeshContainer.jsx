import MeshObject from "./MeshObject";
import React, { Component } from "react";
import axios from "axios";
import "../../style/MeshContainer.css";
import { Canvas } from "@react-three/fiber";
import MeshedLook from "./MeshLook";

export default class MeshContainer extends React.Component {
  constructor(props) {
    // Remove constructor
    super(props);
  }

  render() {
    return (
      <>
        <div className="mesh-container-wrapper">
          <Canvas>
            <color attach="background" args={["#101010"]} />
            <MeshedLook></MeshedLook>
          </Canvas>
        </div>
      </>
    );
  }
}
