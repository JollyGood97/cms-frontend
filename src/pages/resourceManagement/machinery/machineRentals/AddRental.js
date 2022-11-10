import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import LoadingButton from "@mui/lab/LoadingButton";

import { useAddRentalMutation } from "src/api/apiSlice";
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

const AddRental = (props) => {
  const { open, handleClose, mode, rental, setAlertVisible, setAlertMsg } =
    props;
  const [machineryRentalId, setMachineryRentalId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [errorObj, setErrorObj] = useState({
    companyName: false,
    machineryRentalId: false,
  });

  const [addRental, response] = useAddRentalMutation();
  // const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();

  useEffect(() => {
    if (rental && rental.id) {
      setCompanyName(rental.companyName);
      setMachineryRentalId(rental.machineryRentalId);
    }
  }, [rental]);

  const resetData = () => {
    setCompanyName("");
    setMachineryRentalId("");
  };

  const resetErrors = () => {
    setErrorObj({
      companyName: false,
      machineryRentalId: false,
    });
  };

  const validate = () => {
    let valid = true;
    if (companyName === "" || machineryRentalId === "") {
      setErrorObj({
        companyName: companyName === "",
        machineryRentalId: machineryRentalId === "",
      });
      valid = false;
    }
    return valid;
  };
  const onSubmit = () => {
    const isValid = validate();
    if (isValid) {
      const newRental = {
        machineryRentalId,
        companyName,
      };
      if (mode === "add") {
        addRental(newRental)
          .unwrap()
          .then(() => {
            handleClose();
            resetData();
            setAlertVisible(true);
            setAlertMsg("Successfully added Machinery Rental.");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        newRental.id = rental.id;
        // updateEmployee(newEmployee)
        //   .unwrap()
        //   .then(() => {
        //     handleClose();
        //     resetData();
        //     setAlertVisible(true);
        //     setAlertMsg("Successfully updated employee.");
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
      }
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
              {mode === "edit"
                ? "Edit Engineering Corp"
                : "Add Engineering Corp"}
            </b>
          </Typography>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={2}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Machinery Rental ID:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                error={errorObj.machineryRentalId}
                helperText={
                  errorObj.machineryRentalId ? "This field is required." : " "
                }
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={machineryRentalId}
                onChange={(event) => {
                  setErrorObj({ ...errorObj, machineryRentalId: false });
                  setMachineryRentalId(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Company Name:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                error={errorObj.companyName}
                helperText={
                  errorObj.companyName ? "This field is required." : " "
                }
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={companyName}
                onChange={(event) => {
                  setErrorObj({ ...errorObj, companyName: false });
                  setCompanyName(event.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
              marginTop: "20px",
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
            <>
              <Button
                variant="outlined"
                onClick={() => {
                  resetErrors();
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
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AddRental;
