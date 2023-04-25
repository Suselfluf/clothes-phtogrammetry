import * as React from "react";
import "../style/ClothCard.css";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../const/ulrs";
import { useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import cloth_create_new from "../../api/cloth/cloth_create_new";

export default function ClothCard(props) {
  const [title, setTitle] = useState(props.cloth_data.title);
  const [id, setid] = useState(props.cloth_data.id);
  const [description, setdescription] = useState(props.cloth_data.description);
  const [has_images, set_has_images] = useState(false);
  const [cover_image, setcover_image] = useState([]);
  const [is_new, set_is_new] = useState(props.new);

  useEffect(() => {
    return () => {
      try {
        setcover_image(props.cloth_data.cover_images[0].coverimages);
        set_has_images(true);
      } catch (error) {
        setcover_image([]);
        set_has_images(false);
      }
    };
  }, []);

  const navigate = useNavigate();
  const manageCloth = () => {
    navigate(`/admin/manage/:${id}`, { state: props.cloth_data.id });
  };

  const handleCreateNewCloth = async (e) => {
    cloth_create_new().then((res) => {
      console.log(res);
      navigate(`/admin/manage/:${res.id}`, { state: res.id });
    });
  };

  return (
    <>
      {is_new ? (
        <>
          <Card
            variant="outlined"
            sx={{
              width: 320,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            className="card_wrapper"
          >
            <Box>
              <Typography fontSize={23}>Create new cloth</Typography>
            </Box>
            <Box>
              <AddCircleIcon
                sx={{ fontSize: 165 }}
                onClick={handleCreateNewCloth}
              />
            </Box>
          </Card>
        </>
      ) : (
        <>
          <Card variant="outlined" sx={{ width: 320 }} className="card_wrapper">
            <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
              {title}
            </Typography>
            <Typography level="body2">April 24 to May 02, 2021</Typography>
            <IconButton
              aria-label="bookmark Bahamas Islands"
              variant="plain"
              color="neutral"
              size="sm"
              sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
            ></IconButton>
            {has_images ? (
              <>
                <img src={`${BACKEND_URL}${cover_image}`} alt="No-Image" />
              </>
            ) : (
              <>
                <Typography
                  sx={{
                    minHeight: "250px",
                    textAlign: "center",
                    alignItems: "center",
                    display: "grid",
                  }}
                >
                  No image
                </Typography>
              </>
            )}

            <Box sx={{ display: "flex" }}>
              <div>
                <Typography level="body3">Description:</Typography>
                <Typography fontSize="lg" fontWeight="lg">
                  {description}
                </Typography>
              </div>
              <Button
                variant="solid"
                size="sm"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ ml: "auto", fontWeight: 600 }}
                onClick={manageCloth}
              >
                Manage
              </Button>
            </Box>
          </Card>
        </>
      )}
    </>
  );
}
