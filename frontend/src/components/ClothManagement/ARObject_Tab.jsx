import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../../style/ClothManagementCard.css";
import { Container } from "@mui/system";
import { Grid, Portal } from "@mui/material";
import Converting_Images from "./Converting Images/Converting_Images";
import Cover_images from "./Cover Images/Cover_images";
import { Divider } from "@mui/material";
import AR_object from "./Converting Images/AR_object";
import get_converting_images_by_aug_id from "../../../api/converting_images/get_converting_images_by_id";

export default function ARObject_Tab(props) {
  const [title, setTitle] = useState(props.context.title);
  const [is_loaded, set_is_loaded] = useState(false);
  const [aug_model, set_aug_model] = useState(props.aug_model);
  const [has_aug_model, set_has_aug_model] = useState(false);

  useEffect(() => {
    return () => {
      aug_model == false ? set_has_aug_model(false) : set_has_aug_model(true);
      set_is_loaded(true);
    };
  }, []);

  const change_aug_model = (data) => {
    console.log("ArObject_Tab: change_aug_model ewoked");
  };

  return (
    <>
      <Container>
        <Card
          sx={{ minWidth: 275, backgroundColor: "#e2e2e2", minHeight: 300 }}
        >
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {title} Photogrammetry tab
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <>
                <Box>
                  <Converting_Images
                    data={props.context}
                    aug_model={props.context.aug_model}
                  />
                </Box>
                <Divider orientation="vertical" flexItem variant="middle" />
                {is_loaded && has_aug_model ? (
                  <>
                    <Box>
                      <AR_object
                        aug_model={props.context.aug_model}
                        cloth_id={props.context.id}
                        handle_aug_model_change={change_aug_model}
                      />
                    </Box>
                  </>
                ) : (
                  <>
                    <Typography>No data yet</Typography>
                  </>
                )}
              </>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
