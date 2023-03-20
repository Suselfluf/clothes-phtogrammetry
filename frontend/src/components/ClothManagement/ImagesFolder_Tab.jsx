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
import { Grid } from "@mui/material";
import Converting_Images from "./Converting Images/Converting_Images";
import Cover_images from "./Cover Images/Cover_images";
import { Divider } from "@mui/material";
import get_cloth_coverimages from "../../../api/cloth_coverimages/get_cloth_coverimages";
import { BACKEND_CLOTHES_URL } from "../../const/ulrs";

export default function ImagesFolder_Tab(props) {
  const [title, setTitle] = useState(props.context.title);
  const [cover_images, set_cover_images] = useState([]);
  const [cover_images_length, set_cover_images_len] = useState(0);
  const [is_fetched, set_is_fetched] = useState(false);
  useEffect(() => {
    return () => {
      get_cloth_coverimages(
        BACKEND_CLOTHES_URL + `/${props.context.id}/coverimages`
      ).then((res) => {
        set_cover_images(res);
        set_cover_images_len(res.length);
        set_is_fetched(!is_fetched);
      });
    };
  }, []);

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
              {title} cover images tab
            </Typography>

            <Box>
              {is_fetched ? (
                <Cover_images
                  data={props.context}
                  cover_images={cover_images}
                  cover_images_length={cover_images_length}
                />
              ) : (
                <></>
              )}

              {/* <BulkImagesForm></BulkImagesForm> */}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
