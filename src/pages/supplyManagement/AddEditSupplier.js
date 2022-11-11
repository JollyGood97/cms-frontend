import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import LoadingButton from "@mui/lab/LoadingButton";

import {
  useAddSupplierMutation,
  useUpdateMachineMutation,
} from "src/api/apiSlice";
import "src/pages/resourceManagement/Machine.css";

const style = {
  position: "absolute",
  top: "54%",
  left: "61%",
  transform: "translate(-50%, -50%)",
  width: "74%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  flexGrow: 1,
};

const AddEditSupplier = (props) => {
  const { open, handleClose, mode, supplier, setAlertVisible, setAlertMsg } =
    props;
  const [supId, setSupId] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [account, setAccount] = useState("");
  const [remark, setRemark] = useState("");

  //   const [errorObj, setErrorObj] = useState({
  //     name: false,
  //     machineId: false,
  //   });

  const [addSupplier, response] = useAddSupplierMutation();
  //   const [updateMachine, { isLoading }] = useUpdateMachineMutation();

  useEffect(() => {
    if (supplier && supplier.supplier_id) {
      setSupId(supplier.supplier_id);
      setAddress(supplier.supplier_address);
      setName(supplier.supplier_name);
      setContact(supplier.supplier_contact_no);
      setAccount(supplier.supplier_account);
      setRemark(supplier.supplier_remark);
    }
  }, [supplier]);

  const resetData = () => {
    setSupId("");
    setAddress("");
    setName("");
    setContact("");
    setAccount("");
    setRemark("");
  };

  const onSubmit = () => {
    const newS = {
      supplier_id: supId,
      supplier_name: name,
      supplier_address: address,
      supplier_contact_no: contact,
      supplier_account: account,
      supplier_remark: remark,
    };
    if (mode === "add") {
      addSupplier(newS)
        .unwrap()
        .then(() => {
          handleClose();
          resetData();
          setAlertVisible(true);
          setAlertMsg("Successfully added supplier.");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // newS.id = supplier.id;
      // updateMachine(newS)
      //   .unwrap()
      //   .then(() => {
      //     handleClose();
      //     resetData();
      //     setAlertVisible(true);
      //     setAlertMsg("Successfully updated machine.");
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  };

  return (
    <div className="employeeListWrapper">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>
              {mode === "view"
                ? "View Supplier"
                : mode === "edit"
                ? "Edit Supplier"
                : "Add Supplier"}
            </b>
          </Typography>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={2}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Supplier ID:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                // error={errorObj.machineId}
                // helperText={
                //   errorObj.machineId ? "This field is required." : " "
                // }
                InputProps={{
                  readOnly: mode === "view",
                }}
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={supId}
                onChange={(event) => {
                  //   setErrorObj({ ...errorObj, machineId: false });
                  setSupId(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Name:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                // error={errorObj.machineId}
                // helperText={
                //   errorObj.machineId ? "This field is required." : " "
                // }
                InputProps={{
                  readOnly: mode === "view",
                }}
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={name}
                onChange={(event) => {
                  //   setErrorObj({ ...errorObj, machineId: false });
                  setName(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Address:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                // error={errorObj.machineId}
                // helperText={
                //   errorObj.machineId ? "This field is required." : " "
                // }
                InputProps={{
                  readOnly: mode === "view",
                }}
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={address}
                onChange={(event) => {
                  //   setErrorObj({ ...errorObj, machineId: false });
                  setAddress(event.target.value);
                }}
              />
            </Grid>

            <Grid item xs={2}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Contact No:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                // error={errorObj.machineId}
                // helperText={
                //   errorObj.machineId ? "This field is required." : " "
                // }
                InputProps={{
                  readOnly: mode === "view",
                }}
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={contact}
                onChange={(event) => {
                  //   setErrorObj({ ...errorObj, machineId: false });
                  setContact(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Account:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                // error={errorObj.machineId}
                // helperText={
                //   errorObj.machineId ? "This field is required." : " "
                // }
                InputProps={{
                  readOnly: mode === "view",
                }}
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={account}
                onChange={(event) => {
                  //   setErrorObj({ ...errorObj, machineId: false });
                  setAccount(event.target.value);
                }}
              />
            </Grid>

            <Grid item xs={2}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Remark:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                // error={errorObj.machineId}
                // helperText={
                //   errorObj.machineId ? "This field is required." : " "
                // }
                InputProps={{
                  readOnly: mode === "view",
                }}
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={remark}
                onChange={(event) => {
                  //   setErrorObj({ ...errorObj, machineId: false });
                  setRemark(event.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
              marginTop: "40px",
              marginBottom: "20px",
            }}
          >
            {mode === "view" && (
              <Button
                variant="outlined"
                onClick={() => {
                  handleClose();
                }}
                sx={{
                  border: "1px solid",
                  borderColor: "darkBlue",
                  color: "darkBlue",
                  marginRight: "20px",
                  width: "160px",
                }}
              >
                Close
              </Button>
            )}
            {mode !== "view" && (
              <>
                <Button
                  variant="outlined"
                  onClick={() => {
                    // resetErrors();
                    handleClose();
                  }}
                  sx={{
                    border: "1px solid",
                    borderColor: "darkBlue",
                    color: "darkBlue",
                    marginRight: "20px",
                    width: "160px",
                  }}
                >
                  Cancel
                </Button>
                <LoadingButton
                  variant="contained"
                  sx={{
                    backgroundColor: "darkBlue",
                    width: "160px",
                  }}
                  onClick={onSubmit}
                  loading={response.isLoading}
                >
                  {mode === "add" ? "Add" : "Update"}
                </LoadingButton>
              </>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AddEditSupplier;
