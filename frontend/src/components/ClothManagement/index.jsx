import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ARObject_Tab from "./ARObject_Tab";
import ImagesFolder_Tab from "./ImagesFolder_Tab";
import Description_Tab from "./Description_Tab";
import cloth_get_by_id from "../../../api/cloth/cloth_get_single";
import Loader from "../Loader";


export default function CenteredTabs() {
  const location = useLocation();
  const [value, setValue] = useState(0);
  const [is_data_loaded, set_is_data_loaded] = useState(false);
  const [cloth_data, set_cloth_data] = useState("");
  const [aug_model, set_aug_model] = useState({});

  useEffect(() => {
    return () => {
      cloth_get_by_id(location.state).then((responce) => {
        set_cloth_data(responce);
        if (Object.keys(responce.aug_model).length === 0) {
          // console.log("The object is empty");
          set_aug_model(false);
        } else {
          // console.log("has model");
          set_aug_model(responce.aug_model);
        }
        set_is_data_loaded(true);
      });
    };
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // console.log(aug_model);
  };

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Description" />
          <Tab label="Images Folder" />
          <Tab label="AR Object" />
          
        </Tabs>
      </Box>
      {is_data_loaded ? (
        <>
          {value == 0 && (
            <Description_Tab context={cloth_data}></Description_Tab>
          )}
          {value == 1 && (
            <ImagesFolder_Tab context={cloth_data}></ImagesFolder_Tab>
          )}
          {value == 2 && (
            <ARObject_Tab
              context={cloth_data}
              aug_model={aug_model}
            ></ARObject_Tab>
          )}
          
        </>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
}
 