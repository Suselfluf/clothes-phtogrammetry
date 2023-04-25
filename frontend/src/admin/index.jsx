import React from "react";
import BulkImagesForm from "../components/Forms/BulkImages";
import { useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import "../style/AdminLayout.css";
import ClothCard from "./cloth_card";
import cloth_get_list from "../../api/cloth/cloth_get_list";
import { useEffect } from "react";
import Loader from "../components/Loader";
import ResponsiveAppBar from "../components/AppBar";

export default function AdminLayout() {
  const [isAuth, setisAuth] = useState(false);
  const [clothes_data, set_clothes_data] = useState([]);
  const [is_data_loaded, set_is_data_loaded] = useState(false);
  const [is_response_forbidden, set_is_response_forbidden] = useState(false);

  useEffect(() => {
    return () => {
      cloth_get_list().then((response) => {
        // console.log(response);
        set_clothes_data(response);
        set_is_data_loaded(true);
        try {
          if (
            response.response.status === 401 ||
            response.response.status === 403
          ) {
            set_is_response_forbidden(true);
            set_is_data_loaded(false);
          } else {
            set_clothes_data(response);
            set_is_data_loaded(true);
          }
        } catch (err) {
          console.log(err);
        }
      });
    };
  }, []);

  return (
    <>
      {/* <ResponsiveAppBar /> */}
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
                  <ClothCard cloth_data={cloth} key={index} new={false} />
                ))}
                {/* <AddCloth /> */}
                <ClothCard cloth_data={"Create New cloth"} new={true} />
              </Grid>
            </>
          ) : (
            <>
              {is_response_forbidden ? (
                <>
                  <Box>
                    <Typography align="center" fontSize={20}>
                      You dont have previlages to access this side
                    </Typography>
                  </Box>
                </>
              ) : (
                <>
                  <Loader />
                </>
              )}
            </>
          )}
        </Grid>
      </Container>
    </>
  );
}
