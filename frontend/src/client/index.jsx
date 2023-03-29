import { Box, Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import ResponsiveAppBar from "../components/AppBar";
import MeshContainer from "../components/three/MeshContainer";
import get_user_data from "../../api/users/get_user_data";
import tokenInstance from "../../api/tokens/axios";
import { useEffect } from "react";

export default function ClientLayout() {
  const [is_loaded, set_is_loaded] = useState(false);
  const [user_name, set_user_name] = useState("");
  const send_request = () => {};

  useEffect(() => {
    return () => {
      get_user_data().then((response) => {
        console.log(response);
        set_user_name(response.user_name);
        set_is_loaded(!is_loaded);
      });
      // get_user_data().then((response) => {
      //   console.log(respone);
      // });
    };
  }, []);

  return (
    <>
      {/* <ResponsiveAppBar /> */}
      <Container>
        <Box>
          <Typography>Welcome {is_loaded ? user_name : "User"}</Typography>
          <Button onClick={send_request}>Get user data</Button>
        </Box>
        {is_loaded ? (
          <>
            <MeshContainer />
          </>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}
