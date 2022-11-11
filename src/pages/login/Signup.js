import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import "../../App.css";
import Button from "@mui/material/Button";
import { useLoginMutation, useRegisterMutation } from "src/api/apiSlice";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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

const Signup = (props) => {
  let navigate = useNavigate();
  const { open, handleClose, alert, setAlert } = props;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const [register, response] = useRegisterMutation();

  const registerUser = () => {
    register({ username, password, roles: [role] })
      .unwrap()
      .then((userDetails) => {
        handleClose();
        setAlert(true);
      })
      .catch((error) => {
        // setAlert(true);
      });
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <h2>Add User Account</h2>
        <Grid container>
          <Grid xs={12}>
            <Box sx={{ marginTop: "30px", marginBottom: "20px" }}>
              Username:
            </Box>
          </Grid>
          <Grid>
            <TextField
              // error={errorObj.machineId}
              // helperText={
              //   errorObj.machineId ? "This field is required." : " "
              // }
              sx={{
                backgroundColor: "white",
                width: "500px",
                borderRadius: "10px",
              }}
              variant="outlined"
              value={username}
              onChange={(event) => {
                //   setErrorObj({ ...errorObj, machineId: false });
                setUsername(event.target.value);
              }}
            />
          </Grid>
          <Grid xs={12}>
            {" "}
            <Box sx={{ marginTop: "30px", marginBottom: "20px" }}>
              Password:
            </Box>
          </Grid>
          <Grid>
            <TextField
              // error={errorObj.machineId}
              // helperText={
              //   errorObj.machineId ? "This field is required." : " "
              // }
              type={"password"}
              sx={{
                backgroundColor: "white",
                width: "500px",
                borderRadius: "10px",
              }}
              variant="outlined"
              value={password}
              onChange={(event) => {
                //   setErrorObj({ ...errorObj, machineId: false });
                setPassword(event.target.value);
              }}
            />
          </Grid>
          <Grid xs={12}>
            {" "}
            <Box sx={{ marginTop: "30px", marginBottom: "20px" }}>
              User Role:
            </Box>
          </Grid>
          <Grid>
            <Select
              size="small"
              id="demo-select-small"
              value={role}
              onChange={(event) => {
                setRole(event.target.value);
              }}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="super_admin">Super Admin</MenuItem>
              <MenuItem value="contract_admin">Contract Manager</MenuItem>
              <MenuItem value="hr_admin">HR Manager</MenuItem>
              <MenuItem value="machinery_admin">Machinery Manager</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
        >
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
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "darkBlue",
              width: "160px",
            }}
            onClick={registerUser}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default Signup;
