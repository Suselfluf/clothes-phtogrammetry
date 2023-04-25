import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import React from "react";
import BulkImagesForm from "../../Forms/BulkImages";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AlertDialogSlide from "../../Alert";
import Photos_Gallery from "../Cover Images/Photos_gallery";
import BulkMeshImagesForm from "../../Forms/BulkMeshImages";
import { BACKEND_CLOTHES_URL, MESHROOM_URL } from "../../../const/ulrs";
import delete_all_converting_images from "../../../../api/converting_images/delete_all_converting_images";
export default function Converting_Images(props) {
  const [converting_images, set_converting_images] = useState(
    props.converting_images // Needs validation
  );
  const [has_aug_model, set_has_model] = useState(false);
  const [converting_images_len, set_converting_images_len] = useState(
    props.converting_images_len // needs validation
  );
  const [is_upload_open, setis_upload_open] = useState(false);
  const [is_gallery_open, setis_gallery_open] = useState(false);
  const [is_data_loaded, set_is_data_loaded] = useState(false);

  useEffect(() => {
    // console.log(converting_images);
    return () => {
      // console.log(props.aug_model);
      // props.aug_model ? console.log(props.aug_model) : console.log("No model");
      set_is_data_loaded(true);
    };
  }, []);

  const handleConvertingIamgesUpdate = (e) => {
    set_converting_images(e);
    set_converting_images_len(e.length);
  };

  const remove_all_images = () => {
    console.log("Removed");
    delete_all_converting_images({ id: "all" });
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
          Photogrammetry Images
        </Typography>
        {is_data_loaded ? (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
              {converting_images ? (
                <>
                  <IconButton
                    aria-label={notificationsLabel(100)}
                    onClick={(e) => {
                      setis_gallery_open(!is_gallery_open);
                      setis_upload_open(false);
                    }}
                  >
                    <Badge
                      badgeContent={converting_images_len}
                      color="secondary"
                    >
                      <PermMediaIcon fontSize="large" color="primary" />
                    </Badge>
                  </IconButton>
                </>
              ) : (
                <></>
              )}

              <IconButton
                aria-label="Add Photos"
                onClick={(e) => {
                  setis_upload_open(!is_upload_open);
                  setis_gallery_open(false);
                }}
              >
                <AddPhotoAlternateIcon fontSize="large" color="primary" />
              </IconButton>
              {converting_images_len > 0 && (
                <AlertDialogSlide
                  title={props.data.title}
                  remove_data_function={remove_all_images}
                  variant={"Meshroom"}
                ></AlertDialogSlide>
              )}
            </Box>
          </>
        ) : (
          <></>
        )}

        {!is_gallery_open && !is_upload_open && (
          <Box sx={{ minHeight: "240px", minWidth: "364px" }}></Box>
        )}

        {is_gallery_open ? (
          <>
            <Photos_Gallery
              type={"converting_images"}
              images={converting_images}
              cloth_id={props.data.id}
              aug_model_id={props.data.aug_model.id}
              update_image_list={set_converting_images}
              handleUpdate={handleConvertingIamgesUpdate}
            />
          </>
        ) : (
          <></>
        )}
        {is_upload_open ? (
          <BulkMeshImagesForm
            cloth_id={props.data.id}
            aug_model_id={props.data.aug_model.id}
            handleUpdate={handleConvertingIamgesUpdate}
          />
        ) : (
          <></>
        )}
      </Box>
    </>
  );
}
