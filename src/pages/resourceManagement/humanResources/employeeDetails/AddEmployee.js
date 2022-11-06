import "./EmployeeList.css";
import React, { useState } from "react";
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
import FormLabel from "@mui/material/FormLabel";
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";

import { useAddEmployeeMutation } from "src/api/apiSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "61%",
  transform: "translate(-50%, -50%)",
  width: "74%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  flexGrow: 1,
};

const AddEmployee = (props) => {
  const { open, handleClose } = props;
  const [allocatedSiteId, setAllocatedSiteId] = useState("");
  const [type, setType] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");

  const [addEmployee, response] = useAddEmployeeMutation();

  const onSubmit = () => {
    // e.preventDefault()
    const employee = {
      allocatedSiteId,
      name,
      type,
      companyId,
      address,
      dob,
      designation,
    };
    console.log(employee);
    addEmployee(employee)
      .unwrap()
      .then(() => {
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
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
            <b>Add New Employee</b>
          </Typography>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={2}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Full Name:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Site:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Select
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
            <Grid item xs={2}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Address:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                DOB:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="date"
                type="date"
                defaultValue="2017-05-24"
                size="small"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => {
                  setDob(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Designation:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="small"
                id="outlined-basic"
                variant="outlined"
                onChange={(event) => {
                  setDesignation(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={4}></Grid>
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
                    value="INTERNAL"
                    control={<Radio />}
                    label="Internal"
                  />
                  <FormControlLabel
                    value="EXTERNAL"
                    control={<Radio />}
                    label="External"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            {type === "EXTERNAL" && (
              <>
                <Grid item xs={2}>
                  <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                    Company:
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Select
                    size="small"
                    id="demo-select-small"
                    value={companyId}
                    onChange={(event) => {
                      setCompanyId(event.target.value);
                    }}
                  >
                    <MenuItem value="EC1">Conc Ltd</MenuItem>
                    <MenuItem value="EC2">LT ENG Corp</MenuItem>
                    <MenuItem value="EC3">CLCI Ltd</MenuItem>
                  </Select>
                </Grid>
              </>
            )}
          </Grid>
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <Button
              variant="outlined"
              onClick={handleClose}
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
              Add
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
      {/* <h1>Employees</h1>
        <div className="addEmployeeBtn">
          <Button variant="contained" onClick={() => setOpen(true)}>Add Employee</Button>
        </div> */}
    </div>
  );
};

export default AddEmployee;
