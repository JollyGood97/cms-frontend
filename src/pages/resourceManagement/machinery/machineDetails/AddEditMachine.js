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
  useAddMachineMutation,
  useGetRentalsQuery,
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

const AddEditMachine = (props) => {
  const {
    open,
    handleClose,
    mode,
    machine,
    setAlertVisible,
    setAlertMsg,
    setAlertMsgType,
  } = props;
  const [allocatedSiteId, setAllocatedSiteId] = useState("");
  const [type, setType] = useState("INTERNAL");
  const [companyId, setCompanyId] = useState("");
  const [name, setName] = useState("bulldozer");
  const [machineId, setMachineId] = useState("");
  const [errorObj, setErrorObj] = useState({
    name: false,
    machineId: false,
  });

  const [addMachine, response] = useAddMachineMutation();
  const [updateMachine, { isLoading }] = useUpdateMachineMutation();
  const { data } = useGetRentalsQuery({
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (type === "RENTED" && data.length >= 1 && !machine.companyId) {
      setCompanyId(data[0].id);
    }
  }, [data, machine, type]);

  useEffect(() => {
    if (machine && machine.id) {
      setAllocatedSiteId(machine.allocatedSiteId);
      setType(machine.type);
      setName(machine.name);
      setCompanyId(machine.companyId);
      setMachineId(machine.machineId);
    }
  }, [machine]);

  const resetData = () => {
    setAllocatedSiteId("");
    setType("OWNED");
    setName("");
    setCompanyId("");
    setMachineId("");
  };

  const resetErrors = () => {
    setErrorObj({
      name: false,
      machineId: false,
    });
  };

  const validate = () => {
    let valid = true;
    if (name === "" || machineId === "") {
      setErrorObj({
        name: name === "",
        machineId: machineId === "",
      });
      valid = false;
    }
    return valid;
  };
  const onSubmit = () => {
    const isValid = validate();
    if (isValid) {
      const newMachine = {
        allocatedSiteId,
        name,
        type,
        companyId,
        machineId,
      };
      if (mode === "add") {
        addMachine(newMachine)
          .unwrap()
          .then(() => {
            handleClose();
            resetData();
            setAlertVisible(true);
            setAlertMsgType("success");
            setAlertMsg("Successfully added machine.");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        newMachine.id = machine.id;
        updateMachine(newMachine)
          .unwrap()
          .then(() => {
            handleClose();
            resetData();
            setAlertVisible(true);
            setAlertMsgType("success");
            setAlertMsg("Successfully updated machine.");
          })
          .catch((error) => {
            console.log(error);
          });
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
              {mode === "view"
                ? "View Employee"
                : mode === "edit"
                ? "Edit Machine"
                : "Add Machine"}
            </b>
          </Typography>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={2}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Machine ID:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                error={errorObj.machineId}
                helperText={
                  errorObj.machineId ? "This field is required." : " "
                }
                InputProps={{
                  readOnly: mode === "view",
                }}
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={machineId}
                onChange={(event) => {
                  setErrorObj({ ...errorObj, machineId: false });
                  setMachineId(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Category:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Select
                readOnly={mode === "view"}
                size="small"
                id="demo-select-small"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              >
                <MenuItem value="Trencher">Trencher</MenuItem>
                <MenuItem value="Bulldozer">Bulldozer</MenuItem>
                <MenuItem value="Cement Mixer">Cement Mixer</MenuItem>
                <MenuItem value="Dump Truck">Dump Truck</MenuItem>
                <MenuItem value="Backhoe">Backhoe</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={2}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Site:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Select
                readOnly={mode === "view"}
                size="small"
                id="demo-select-small"
                value={allocatedSiteId}
                onChange={(event) => {
                  setAllocatedSiteId(event.target.value);
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="A1">A1</MenuItem>
                <MenuItem value="B1">B1</MenuItem>
                <MenuItem value="A2">A2</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={2}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Type:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={type}
                  onChange={(event) => {
                    setType(event.target.value);
                  }}
                >
                  <FormControlLabel
                    disabled={mode === "view"}
                    value="OWNED"
                    control={<Radio />}
                    label="Owned"
                  />
                  <FormControlLabel
                    disabled={mode === "view"}
                    value="RENTED"
                    control={<Radio />}
                    label="Rented"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {type === "RENTED" && (
              <>
                <Grid item xs={2}>
                  <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                    Machinery Rental:
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Select
                    readOnly={mode === "view"}
                    size="small"
                    id="demo-select-small"
                    value={companyId}
                    onChange={(event) => {
                      setCompanyId(event.target.value);
                    }}
                  >
                    {data.map((corp) => (
                      <MenuItem value={corp.id}>{corp.companyName}</MenuItem>
                    ))}
                  </Select>
                </Grid>
              </>
            )}
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
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default AddEditMachine;
