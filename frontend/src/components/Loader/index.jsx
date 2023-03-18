import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function CircularColor() {
  return (
    <Box
      sx={{ color: "grey.500" }}
      spacing={2}
      direction="row"
      alignSelf="center"
    >
      <CircularProgress color="inherit" />
    </Box>
  );
}
