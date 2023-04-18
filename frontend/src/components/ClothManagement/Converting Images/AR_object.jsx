import React from "react";
import { useEffect } from "react";
import { Component } from "react";
import axios from "axios";
import { Box, Container } from "@mui/system";
import { Canvas } from "@react-three/fiber";
import { Button } from "@mui/material";
import { useState } from "react";
import { Typography } from "@mui/material";
import MeshedLook from "../../three/MeshLook";
import AdminMeshedLookBox from "../../three/Admin/AdminMeshedLookBox";
import get_augmented_object_by_cloth_id from "../../../../api/augmented_objects/get_augmented_object_by_cloth_id";
export default function AR_object(props) {
  const [cloth_id, set_cloth_id] = useState(props.cloth_id);
  const [mesh_url, set_mesh_url] = useState("");
  const [is_mesh_recieved, set_is_mesh_recieved] = useState(false);
  // const [mesh_texture_array, set_mesh_texture_array] = useState([]);
  const [mesh_texture_url, set_mesh_texture_url] = useState("");

  useEffect(() => {
    return () => {
      props.aug_model.aug_model &&
        get_augmented_object_by_cloth_id(cloth_id).then((res) => {
          // set_mesh_texture_array(res.textures);
          set_mesh_url(res.aug_model.aug_model);
          set_mesh_texture_url(res.aug_model.texture);
          set_is_mesh_recieved(true);
          console.log(mesh_url)
        });
        
    };
    
  }, []);

  return (
    <>
      {props.aug_model.aug_model ? (
        <Container sx={{ height: "400px" }}>
          <Canvas>
            <color attach="background" args={["#101010"]} />
            {is_mesh_recieved ? (
              <>
                <AdminMeshedLookBox
                  mesh_url={mesh_url}
                  // mesh_texture_array={mesh_texture_array}
                  mesh_texture_url={mesh_texture_url}
                ></AdminMeshedLookBox>
              </>
            ) : (
              <></>
            )}
          </Canvas>
          {/* <Button onClick={handleAugObjRequest}>Click me</Button> */}
        </Container>
      ) : (
        <>
          <Container>
            <Typography align="center">No model yet...</Typography>
          </Container>
        </>
      )}
    </>
  );
}
