import React from "react";
import { useState } from "react";

import "../../style/BulkUpload.css";
import Box from "@mui/material/Box";

import InputAdornment from "@mui/material/InputAdornment";
import { Tooltip, Button } from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import TextField from "@mui/material/TextField";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import send_images from "../../../api/meshroom/send_images";
import { SEND_IMAGES_MESHROOM_URL } from "../../const/ulrs";
import add_converting_images_by_id from "../../../api/converting_images/add_converting_images_by_id";
import get_augmented_object_by_cloth_id from "../../../api/augmented_objects/get_augmented_object_by_cloth_id";

export default function BulkMeshImagesForm(props) {
  const [bulkImagesArray, addToBulkImages] = useState([]);
  const [folderName, setUpFolderName] = useState(
    "Converting_for_" + props.cloth_id
  );

  const [method, set_method] = useState(props.method);
  const [layout, set_layout] = useState(props.variant);
  const [is_pending, set_is_pending] = useState(false);

  const handleImage = (e) => {
    for (const file of e.target.files) {
      addToBulkImages((prevItems) => [...prevItems, file]);
    }
  };

  const handleFolderName = (e) => {
    setUpFolderName(e.target.value);
  };

  const handleBulkSubmit = (e) => {
    const data = new FormData();
    const mesh_data = new FormData();

    data.append("aug_model", props.aug_model_id);

    for (const file of bulkImagesArray) {
      data.append("convertingimages", file);
      mesh_data.append("files", file);
    }

    mesh_data.append("foldername", folderName);
    mesh_data.append("cloth_id", props.cloth_id);

    add_converting_images_by_id(props.cloth_id, data).then((res) => {
      // console.log(res);
      props.handleUpdate(res);
    });

    send_images(SEND_IMAGES_MESHROOM_URL, mesh_data, "post").then((res) => {
      console.log(res);
      // props.handleUpdate(res);
    });

    get_augmented_object_by_cloth_id(props.cloth_id).then((res) => {
      console.log("New Aug Object was created");
      console.log(res.data);
      // set_mesh_url(res.aug_model.aug_model);
      // set_mesh_texture_url(res.aug_model.texture);
      // set_is_mesh_recieved(true);
    });
  };

  return (
    <>
      <Box marginTop={"5%"}>
        <Box component="form" noValidate autoComplete="off">
          <Box
            sx={{
              border: "2px dashed #1475cf",
            }}
          >
            <input
              className="image_input_fild"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "200px",
                minWidth: "360px",
              }}
              multiple
              type="file"
              name="file"
              onChange={handleImage}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8%",
              justifyContent: "space-around",
            }}
          >
            <>
              <TextField
                id="input-with-icon-textfield"
                label={"Folder Name"}
                margin={"dense"}
                onChange={handleFolderName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreateNewFolderIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                fullWidth={true}
              />
              <Tooltip title="Update Information">
                <PublishIcon
                  fontSize="large"
                  color="primary"
                  sx={{
                    border: "1px solid #1475cf",
                    borderRadius: "100%",
                    padding: "5px",
                  }}
                  onClick={(e) => {
                    handleBulkSubmit();
                  }}
                />
              </Tooltip>
            </>
          </Box>
        </Box>
      </Box>
    </>
  );
}
