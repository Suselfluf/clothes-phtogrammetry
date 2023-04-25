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
import {
  Grid,
  TextField,
  Tooltip,
  ImageList,
  ImageListItem,
} from "@mui/material";
import SelectTextFields from "../Selectors/select-input";
import update_cloth_by_id from "../../../api/update_cloth/update_cloth";
import { BACKEND_URL, BACKEND_CLOTHES_URL } from "../../const/ulrs";
import get_cloth_coverimages from "../../../api/cloth_coverimages/get_cloth_coverimages";

export default function Description_Tab(props) {
  const [title, setTitle] = useState(props.context.title);
  const [cover_image, set_cover_image] = useState([]);
  const [wearable_part, set_wearable_part] = useState(
    props.context.wearable_part
  );
  const [id, setid] = useState(props.context.id);
  const [description, set_description] = useState(props.context.description);

  const updateField = () => {
    update_cloth_by_id(id, title, description, wearable_part).then(
      (responce) => {
        console.log(responce);
      }
    );
  };

  useEffect(() => {
    return () => {
      get_cloth_coverimages(BACKEND_CLOTHES_URL + `/${id}/coverimages`).then(
        (res) => {
          try {
            set_cover_image(res[0].coverimages);
          } catch (error) {
            // console.log(error);
            set_cover_image([]);
          }
        }
      );
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
              {title} Description Tab
            </Typography>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="center"
            >
              <Box>
                <Typography
                  sx={{ fontSize: 12 }}
                  color="text.secondary"
                  gutterBottom
                  align="center"
                >
                  What will users see*
                </Typography>
                <Box
                  sx={{
                    backgroundColor: "white",
                    padding: "5%",
                    borderRadius: "5%",
                    maxWidth: "300px",
                  }}
                >
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ marginBottom: "5%" }}
                  >
                    {title}
                  </Typography>
                  {cover_image.length != 0 ? (
                    <>
                      <Box sx={{ overflowY: "scroll" }}>
                        <ImageList variant="masonry" cols={1} gap={8}>
                          <ImageListItem key={cover_image.id}>
                            <img
                              src={`${BACKEND_URL}${cover_image}?w=348&fit=crop&auto=format`}
                              alt={"Failed to load"}
                              loading="lazy"
                            />
                          </ImageListItem>
                        </ImageList>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          minHeight: 120,
                          textAlign: "center",
                        }}
                      >
                        <Typography>No Image Yet...</Typography>
                      </Box>
                    </>
                  )}

                  <Typography
                    variant="body2"
                    sx={{ mb: 1.5, minWidth: "200px" }}
                    color="text.secondary"
                  >
                    {description}
                  </Typography>
                  <Typography sx={{ mt: 1.5 }} color="text.primary">
                    Wearable part: {wearable_part}
                  </Typography>
                </Box>
              </Box>

              <Box component="form" noValidate autoComplete="off">
                <Typography variant="h5" component="div">
                  <TextField
                    helperText="Modify title of the cloth"
                    id="demo-helper-text-aligned"
                    label={"Title"}
                    value={title}
                    onChange={(data) => setTitle(data.target.value)}
                    margin={"dense"}
                  />
                </Typography>
                <Typography variant="h5" component="div">
                  <TextField
                    helperText="Modify description of the cloth"
                    id="demo-helper-text-aligned"
                    label={"Description"}
                    value={description}
                    fullWidth={true}
                    onChange={(data) => set_description(data.target.value)}
                    margin={"dense"}
                  />
                </Typography>
                <SelectTextFields wearable_part={wearable_part}
                  values={[
                    {
                      value: "FULL",
                      label: "Full",
                    },
                    {
                      value: "TOP",
                      label: "Top",
                    },
                    {
                      value: "BOTTOM",
                      label: "Bottom",
                    },
                  ]}
                />
              </Box>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Tooltip title="Update Information">
              <Button
                size="small"
                onClick={(e) => {
                  updateField();
                }}
              >
                Submit Changes
              </Button>
            </Tooltip>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}
