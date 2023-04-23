import MeshObject from "./MeshObject";
import React, { Component } from "react";
import axios from "axios";

import { Canvas } from "@react-three/fiber";
import MeshedLook from "./MeshLook";
import { Container } from "@mui/material";

export default class MeshContainer extends React.Component {
  constructor(props) {
    // Remove constructor
    super(props);
  }

  render() {
    return (
      <>
        <Container sx={{ height: "100vh", width: "90vw", padding: "0px" }}>
          {/* <div className="mesh-container-wrapper"> */}
          <Canvas>
            <color attach="background" args={["#101010"]} />
            <MeshedLook></MeshedLook>
          </Canvas>
          {/* </div> */}
        </Container>
      </>
    );
  }
}
