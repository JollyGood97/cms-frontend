import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import "../../App.css";
import Button from "@mui/material/Button";
import { useLoginMutation } from "src/api/apiSlice";

const Login = () => {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, response] = useLoginMutation();

  const loginUser = () => {
    login({ username, password })
      .unwrap()
      .then((userDetails) => {
        if (userDetails.token) {
          localStorage.setItem("user", JSON.stringify(userDetails));
          navigate("/dashboard");
          window.location.reload();
        }
      })
      .catch((error) => {});
  };

  return (
    <Box className="loginBox">
      <h2>CMS - LOGIN</h2>
      <Grid container>
        <Grid xs={12}>
          <Box sx={{ marginTop: "30px", marginBottom: "20px" }}>Username:</Box>
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
          <Box sx={{ marginTop: "30px", marginBottom: "20px" }}>Password:</Box>
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
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          disabled={username === "" || password === ""}
          variant="outlined"
          onClick={loginUser}
          sx={{
            color: "black",
            marginTop: "50px",
            backgroundColor: "cyan",
            marginRight: "20px",
            width: "160px",
            "&:hover": { backgroundColor: "cyan" },
          }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
