import "./EmployeeList.css";
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
  useAddEmployeeMutation,
  useGetCorpsQuery,
  useUpdateEmployeeMutation,
} from "src/api/apiSlice";

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

const AddEmployee = (props) => {
  const { open, handleClose, mode, employee, setAlertVisible, setAlertMsg } =
    props;
  const [allocatedSiteId, setAllocatedSiteId] = useState("");
  const [type, setType] = useState("INTERNAL");
  const [companyId, setCompanyId] = useState("");
  const [name, setName] = useState("");
  const [empId, setEmpId] = useState("");
  const [designation, setDesignation] = useState("");
  const [dob, setDob] = useState(new Date());
  const [address, setAddress] = useState("");
  const [errorObj, setErrorObj] = useState({
    name: false,
    address: false,
    designation: false,
    empId: false,
  });

  const [addEmployee, response] = useAddEmployeeMutation();
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();
  const { data } = useGetCorpsQuery({
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    if (type === "EXTERNAL" && data.length >= 1 && !employee.companyId) {
      setCompanyId(data[0].id);
    }
  }, [data, employee, type]);

  useEffect(() => {
    if (employee) {
      setAllocatedSiteId(employee.allocatedSiteId);
      setType(employee.type);
      setName(employee.name);

      if (employee.dob) {
        setDob(new Date(employee.dob));
      }
      setCompanyId(employee.companyId);
      setAddress(employee.address);
      setDesignation(employee.designation);
      setEmpId(employee.empId);
    }
  }, [employee]);

  const resetData = () => {
    setAllocatedSiteId("");
    setType("INTERNAL");
    setName("");
    setDob(new Date());
    setCompanyId("");
    setAddress("");
    setDesignation("");
    setEmpId("");
  };

  const resetErrors = () => {
    setErrorObj({
      name: false,
      address: false,
      designation: false,
      empId: false,
    });
  };

  const validate = () => {
    let valid = true;
    if (name === "" || designation === "" || address === "" || empId === "") {
      setErrorObj({
        name: name === "",
        designation: designation === "",
        address: address === "",
        empId: empId === "",
      });
      valid = false;
    }
    return valid;
  };
  const onSubmit = () => {
    const isValid = validate();
    if (isValid) {
      const formattedDateString = dob.toISOString().slice(0, 10);
      const newEmployee = {
        allocatedSiteId,
        name,
        type,
        companyId,
        address,
        formattedDateString,
        designation,
        empId,
      };
      if (mode === "add") {
        addEmployee(newEmployee)
          .unwrap()
          .then(() => {
            handleClose();
            resetData();
            setAlertVisible(true);
            setAlertMsg("Successfully added employee.");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        newEmployee.id = employee.id;
        updateEmployee(newEmployee)
          .unwrap()
          .then(() => {
            handleClose();
            resetData();
            setAlertVisible(true);
            setAlertMsg("Successfully updated employee.");
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
                ? "Edit Employee"
                : "Add Employee"}
            </b>
          </Typography>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={2}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Full Name:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                error={errorObj.name}
                helperText={errorObj.name ? "This field is required." : " "}
                InputProps={{
                  readOnly: mode === "view",
                }}
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={name}
                onChange={(event) => {
                  setErrorObj({ ...errorObj, name: false });
                  setName(event.target.value);
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Employee ID:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                error={errorObj.empId}
                helperText={errorObj.empId ? "This field is required." : " "}
                InputProps={{
                  readOnly: mode === "view",
                }}
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={empId}
                onChange={(event) => {
                  setErrorObj({ ...errorObj, empId: false });
                  setEmpId(event.target.value);
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
            <Grid item xs={2}>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Address:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                error={errorObj.address}
                helperText={errorObj.address ? "This field is required." : " "}
                InputProps={{
                  readOnly: mode === "view",
                }}
                size="small"
                id="outlined-basic"
                variant="outlined"
                value={address}
                onChange={(event) => {
                  setErrorObj({ ...errorObj, address: false });
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
                InputProps={{
                  readOnly: mode === "view",
                }}
                id="date"
                type="date"
                value={dob.toISOString().slice(0, 10)}
                size="small"
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => {
                  setDob(new Date(event.target.value));
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
                error={errorObj.designation}
                helperText={
                  errorObj.designation ? "This field is required." : " "
                }
                InputProps={{
                  readOnly: mode === "view",
                }}
                value={designation}
                size="small"
                id="outlined-basic"
                variant="outlined"
                onChange={(event) => {
                  setErrorObj({ ...errorObj, designation: false });
                  setDesignation(event.target.value);
                }}
              />
            </Grid>

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
                    value="INTERNAL"
                    control={<Radio />}
                    label="Internal"
                  />
                  <FormControlLabel
                    disabled={mode === "view"}
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
      {/* <h1>Employees</h1>
        <div className="addEmployeeBtn">
          <Button variant="contained" onClick={() => setOpen(true)}>Add Employee</Button>
        </div> */}
    </div>
  );
};

export default AddEmployee;
