import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = useState(false);
  const [layout, set_layout] = useState(props.variant);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <IconButton aria-label="Delete All Images" onClick={handleClickOpen}>
        <DeleteIcon fontSize="large" color="secondary" />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {layout === "Meshroom" ? (
          <>
            <DialogTitle>{"Remove all images for photogrammetry?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to remove all images from "{props.title}"
                containing on the server
              </DialogContentText>
            </DialogContent>
          </>
        ) : (
          <>
            <DialogTitle>{"Delete all photos of this cloth?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to remove all images from "{props.title}"
              </DialogContentText>
            </DialogContent>
          </>
        )}

        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={(e) => {
              props.remove_data_function();
              handleClose();
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
