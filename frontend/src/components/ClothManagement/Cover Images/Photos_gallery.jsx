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
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

export default function Photos_Gallery(props) {
  const [layout, set_layout] = useState(props.type);
  const [cloth_id, set_cloth_id] = useState(props.cloth_id);

  useEffect(() => {
    return () => {};
  }, []);

  const handleRemoveImage = (image_id) => {
    const data = new FormData();

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
    }
  };

  return (
    <>
      {props.images.length != 0 ? (
        <>
          <List
            sx={{
              minWidth: "360px",
              // maxWidth: 360,
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
                    <img
                      src={`${BACKEND_URL}${item.coverimages}?w=348&fit=crop&auto=format`}
                      alt={"Failed to load"}
                      loading="lazy"
                    />
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
