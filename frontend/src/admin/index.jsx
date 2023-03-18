import React from "react";
import BulkImagesForm from "../components/Forms/BulkImages";
import { useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import "../style/AdminLayout.css";
import ClothCard from "./cloth_card";
import cloth_get_list from "../../api/cloth_get/cloth_get_list";
import { useEffect } from "react";
import Loader from "../components/Loader";

export default function AdminLayout() {
  const [isAuth, setisAuth] = useState(false);
  const [clothes_data, set_clothes_data] = useState([]);
  const [is_data_loaded, set_is_data_loaded] = useState(false);

  useEffect(() => {
    return () => {
      cloth_get_list().then((responce) => {
        // console.log(responce);
        set_clothes_data(responce);
        set_is_data_loaded(true);
      });
    };
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
          direction="column"
          justifyContent="center"
          alignItems="stretch"
        >
          <Grid item xs>
            <Typography align="center" level="h2">
              Admin Layout
            </Typography>
          </Grid>
          {is_data_loaded ? (
            <>
              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="stretch"
                className="cloth_cards_wrapper"
              >
                {clothes_data.map((cloth, index) => (
                  <ClothCard cloth_data={cloth} key={index} />
                ))}
              </Grid>
            </>
          ) : (
            <>
              <Loader />
            </>
          )}
        </Grid>
      </Container>
    </>
  );
}
