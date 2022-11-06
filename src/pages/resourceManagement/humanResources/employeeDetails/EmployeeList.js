import "./EmployeeList.css";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddEmployee from "./AddEmployee";

const EmployeeList = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="reports">
      <div className="employeeListWrapper">
        <h1>Employees</h1>
        <div className="addEmployeeBtn">
          <Button variant="contained" onClick={() => setOpen(true)}>
            Add Employee
          </Button>
        </div>
      </div>
      <AddEmployee open={open} handleClose={() => setOpen(false)} />
    </div>
  );
};

export default EmployeeList;
