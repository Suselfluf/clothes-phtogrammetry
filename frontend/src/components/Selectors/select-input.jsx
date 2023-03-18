import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import console from "console";

export default function SelectTextFields(props) {
  return (
    <>
      <TextField
        id="outlined-select-currency"
        select
        label="Part"
        defaultValue="TOP"
        helperText="Specify textile coverage area "
        margin={"dense"}
      >
        {props.values.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
}
