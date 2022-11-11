import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import { Navigate, useNavigate } from "react-router-dom";

import Signup from "./login/Signup";
import { getCurrentUser } from "src/util/Util";
import { Box } from "@mui/material";
import avatar from "src/avatar.png";

const Dashboard = () => {
  let navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState(false);

  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home">
      <h1>Dashboard</h1>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box>
          <h2>Welcome, {user && user.username}!</h2>
        </Box>
        <Box marginTop="40px" marginLeft="-236px">
          <img src={avatar} alt="avatar" />
        </Box>
      </Box>
      <div className="dashboardWrapper">
        {user &&
          (user.roles.includes("ROLE_SUPER_ADMIN") ||
            user.roles.includes("ROLE_CONTRACT_MANAGER")) && (
            <div
              className="dLink"
              onClick={() => navigate("/contract-management")}
            >
              Contract Management
            </div>
          )}

        {user &&
          (user.roles.includes("ROLE_SUPER_ADMIN") ||
            user.roles.includes("ROLE_HR_MANAGER") ||
            user.roles.includes("ROLE_MACHINE_MANAGER")) && (
            <div className="dLink" onClick={() => navigate("/resources")}>
              Resource Management
            </div>
          )}

        {user &&
          (user.roles.includes("ROLE_SUPER_ADMIN") ||
            user.roles.includes("ROLE_SUPPLIER_MANAGER")) && (
            <div
              className="dLink"
              onClick={() => navigate("/supplies/suppliers")}
            >
              Supply Management
            </div>
          )}

        {user && user.roles.includes("ROLE_SUPER_ADMIN") && (
          <div className="dLink" onClick={() => setVisible(true)}>
            Add Users
          </div>
        )}
      </div>
      {alert && (
        <Alert
          sx={{ marginTop: "10px" }}
          severity="success"
          onClose={() => {
            setAlert(false);
          }}
        >
          Successfully added new user account.
        </Alert>
      )}
      <Signup
        open={visible}
        handleClose={() => setVisible(false)}
        alert={alert}
        setAlert={setAlert}
      />
    </div>
  );
};

export default Dashboard;
