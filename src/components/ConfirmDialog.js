import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

const ConfirmDialog = (props) => {
  const {
    title,
    content,
    dialogVisible,
    setDialogVisible,
    onConfirm,
    ...other
  } = props;
  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={dialogVisible}
      {...other}
    >
      <DialogTitle>Delete Employee</DialogTitle>
      <DialogContent>
        Are you sure you want to delete this Employee? This action cannot be
        undone.
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => setDialogVisible(false)}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            setDialogVisible(false);
          }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
