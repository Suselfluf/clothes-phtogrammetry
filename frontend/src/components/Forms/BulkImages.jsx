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

export default function BulkImagesForm(props) {
  const [bulkImagesArray, addToBulkImages] = useState([]);
  const [folderName, setUpFolderName] = useState("Folder Name");
  const [destination_url, setdestination_url] = useState(props.destination);
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

    if (layout == "Meshroom") {
      for (const file of bulkImagesArray) {
        data.append("files", file);
      }
      data.append("foldername", folderName);
    } else {
      for (const file of bulkImagesArray) {
        data.append("coverimages", file);
        data.append("cloth", props.cloth_id);
      }
    }

    send_images(destination_url, data, method).then((res) => {
      // console.log(res);
      props.handleUpdate(res);
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
            {layout === "Meshroom" ? (
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
            ) : (
              <>
                <Box margin={"dense"}>
                  <Button
                    size="small"
                    onClick={(e) => {
                      handleBulkSubmit();
                    }}
                  >
                    Upload
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
