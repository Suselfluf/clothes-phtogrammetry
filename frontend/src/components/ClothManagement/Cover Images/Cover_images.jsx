import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import React from "react";
import BulkImagesForm from "../../Forms/BulkImages";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertDialogSlide from "../../Alert";
import Photos_Gallery from "./Photos_gallery";
import { BACKEND_CLOTHES_URL } from "../../../const/ulrs";
import get_cloth_coverimages from "../../../../api/cloth_coverimages/get_cloth_coverimages";

export default function Cover_images(props) {
  const [destination_url, set_destination_url] = useState(
    BACKEND_CLOTHES_URL + `/${props.data.id}/coverimages`
  );
  const [cover_images, set_cover_images] = useState([props.cover_images]);
  const [cover_images_length, set_cover_images_len] = useState(
    props.cover_images_length
  );
  const [is_upload_open, setis_upload_open] = useState(false);
  const [is_gallery_open, setis_gallery_open] = useState(false);

  useEffect(() => {
    return () => {};
  }, []);

  const remove_all_images = () => {
    console.log("Removed");
  };

  const handleCoverIamgesUpdate = (e) => {
    set_cover_images(e);
    set_cover_images_len(e.length);
  };

  function notificationsLabel(count) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }

  return (
    <>
      <Box>
        <Typography
          sx={{ fontSize: 16 }}
          color="text.secondary"
          gutterBottom
          align="center"
        >
          Cover Images
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <IconButton
            aria-label={notificationsLabel(100)}
            onClick={(e) => {
              setis_gallery_open(!is_gallery_open);
              get_cloth_coverimages(destination_url).then((res) => {
                handleCoverIamgesUpdate(res);
              });
              setis_upload_open(false);
            }}
          >
            <Badge badgeContent={cover_images_length} color="secondary">
              <PermMediaIcon fontSize="large" color="primary" />
            </Badge>
          </IconButton>
          <IconButton
            aria-label="Add Photos"
            onClick={(e) => {
              setis_upload_open(!is_upload_open);
              setis_gallery_open(false);
            }}
          >
            <AddPhotoAlternateIcon fontSize="large" color="primary" />
          </IconButton>
          <AlertDialogSlide
            title={props.data.title}
            remove_data_function={remove_all_images}
          ></AlertDialogSlide>
        </Box>
        {!is_gallery_open && !is_upload_open && (
          <Box sx={{ minHeight: "240px", minWidth: "364px" }}></Box>
        )}

        {is_gallery_open ? (
          <Photos_Gallery
            type={"cover_images"}
            images={cover_images}
            cloth_id={props.data.id}
            update_image_list={set_cover_images}
            handleUpdate={handleCoverIamgesUpdate}
          />
        ) : (
          <></>
        )}
        {is_upload_open ? (
          <BulkImagesForm
            destination={destination_url}
            variant={"Django"}
            method={"post"}
            cloth_id={props.data.id}
            handleUpdate={handleCoverIamgesUpdate}
          />
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}
