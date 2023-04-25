import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { IconButton } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { useState, useEffect } from "react";
import { BACKEND_MEDIA_URL, BACKEND_URL } from "../../../const/ulrs";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import remove_coverimage_by_id from "../../../../api/cloth_coverimages/remove_coverimage_by_id";
import remove_converting_image_by_id from "../../../../api/converting_images/remove_converting_image_by_id";
import ImageList from "@mui/material/ImageList";
import { Button } from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import CircularProgress from "@mui/material/CircularProgress";
import LinearWithValueLabel from "../../Loader/Linear_progress_with_label";
import update_augmented_object_by_cloth_id from "../../../../api/augmented_objects/update_augmented_object_by_cloth_id";
import tokenInstance from "../../../../api/tokens/axios";

export default function Photos_Gallery(props) {
  const [layout, set_layout] = useState(props.type);
  const [cloth_id, set_cloth_id] = useState(props.cloth_id);
  const [aug_model_id, set_aug_model_id] = useState(props.aug_model_id);
  const [is_convert_pending, set_is_convert_pending] = useState(false);
  useEffect(() => {
    return () => {};
  }, []);

  const handleRemoveImage = (image_id) => {
    switch (layout) {
      case "cover_images":
        try {
          const data = new FormData();
          data.append("cloth", cloth_id);
          data.append("id", image_id);
          remove_coverimage_by_id(image_id, data).then((res) => {
            props.handleUpdate(res);
          });
        } catch (error) {
          console.log(error);
        }
        break;
      case "converting_images": {
        try {
          const data = new FormData();
          data.append("aug_model", aug_model_id);
          data.append("id", image_id);
          remove_converting_image_by_id(image_id, data, cloth_id).then(
            (res) => {
              props.handleUpdate(res);
            }
          );
        } catch (error) {}
        break;
      }
    }
  };

  const handleConverting = async (event) => {
    // set_is_convert_pending(!is_convert_pending);
    // update_augmented_object_by_cloth_id(cloth_id).then((res) => {
    //   console.log(res);
    // });
    const response = await tokenInstance
      .post(`aug-convert/${cloth_id}`, {
        access_token: localStorage.getItem("access_token"),
        folder_name: "Purple_Pants",
        cloth_id: cloth_id,
        // wearable_part: wearable_part,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  const startMQBrokker = async (event) => {
    // set_is_convert_pending(!is_convert_pending);
    const response = await tokenInstance
      .post(`aug-convert/${cloth_id}`, {
        access_token: localStorage.getItem("access_token"),
        folder_name: "Cream_Pants",
        // wearable_part: wearable_part,
      })
      .then((res) => {
        console.log(res.data);
      });
    // .then((res) => {
    //   console.log(res);
    // });
  };

  const getMessagesFromQueue = async (queue) => {
    const response2 = await tokenInstance
      .delete(`aug-convert/${cloth_id}`, {})
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      {props.images.length != 0 ? (
        <>
          <Box sx={{ display: "grid", justifyContent: "center" }}>
            {layout == "converting_images" && (
              <>
                {" "}
                <Button
                  sx={{ marginBottom: 3 }}
                  color={!is_convert_pending ? "primary" : "grey"}
                  variant="contained"
                  endIcon={
                    !is_convert_pending ? (
                      <PublishedWithChangesIcon />
                    ) : (
                      <CircularProgress color="inherit" size={20} />
                    )
                  }
                  onClick={handleConverting}
                >
                  Convert into AR Object
                </Button>
                {/* <Button onClick={startMQBrokker}>Start Broker</Button>
                <Button onClick={getMessagesFromQueue}>Get Messages</Button> */}
              </>
            )}
            {is_convert_pending && <LinearWithValueLabel />}{" "}
            {/*For next iteration to track the progress of convertation*/}
          </Box>
          <List
            sx={{
              minWidth: "360px",
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",

              "& ul": { padding: 0 },
            }}
            subheader={<li />}
          >
            <Box sx={{ overflowY: "scroll" }}>
              <ImageList variant="masonry" cols={3} gap={8}>
                {props.images.map((item, key) => (
                  <ImageListItem key={key}>
                    {layout == "converting_images" ? (
                      <img
                        src={`${BACKEND_URL}${item.convertingimages}?w=348&fit=crop&auto=format`}
                        alt={"Failed to load"}
                        loading="lazy"
                      />
                    ) : (
                      <img
                        src={`${BACKEND_URL}${item.coverimages}?w=348&fit=crop&auto=format`}
                        alt={"Failed to load"}
                        loading="lazy"
                      />
                    )}
                    {/* <img
                      src={`${BACKEND_URL}${item.convertingimages}?w=348&fit=crop&auto=format`}
                      alt={"Failed to load"}
                      loading="lazy"
                    /> */}
                    <IconButton
                      sx={{ position: "absolute", top: "2%", right: "2%" }}
                      aria-label="Delete Image"
                      onClick={(e) => {
                        handleRemoveImage(item.id);
                      }}
                    >
                      <PlaylistRemoveIcon
                        fontSize="large"
                        style={{ color: "red" }}
                      />
                    </IconButton>
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
            <Box></Box>
          </List>
        </>
      ) : (
        <>
          <Box>
            <Typography>No data yet...</Typography>
          </Box>
        </>
      )}
    </>
  );
}
