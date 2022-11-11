import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";

import Signup from "./login/Signup";

const Dashboard = () => {
  let navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [alert, setAlert] = useState(false);

  return (
    <div className="home">
      <h1>Dashboard</h1>
      <div className="dashboardWrapper">
        <div className="dLink" onClick={() => navigate("/contract-management")}>
          Contract Management
        </div>
        <div className="dLink" onClick={() => navigate("/resources")}>
          Resource Management
        </div>
        <div className="dLink" onClick={() => navigate("/supplies")}>
          Supply Management
        </div>
        <div className="dLink" onClick={() => setVisible(true)}>
          Add Users
        </div>
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
