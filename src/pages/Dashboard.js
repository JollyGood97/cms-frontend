import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import { Navigate, useNavigate } from "react-router-dom";

import Signup from "./login/Signup";
import { getCurrentUser } from "src/util/Util";

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
