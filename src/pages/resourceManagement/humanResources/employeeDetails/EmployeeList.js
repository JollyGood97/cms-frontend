// @ts-nocheck
import "./EmployeeList.css";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import Button from "@mui/material/Button";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import AddEmployee from "./AddEmployee";
import tableIcons from "src/components/MaterialTableIcons";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Alert from "@mui/material/Alert";

import {
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
} from "src/api/apiSlice";
import ConfirmDialog from "src/components/ConfirmDialog";
import { getCurrentUser } from "src/util/Util";
import EventBus from "src/EventBus";

const defaultMaterialTheme = createTheme();

const EmployeeList = () => {
  const [open, setOpen] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertMsgType, setAlertMsgType] = useState("");

  const [employees, setEmployees] = useState();
  const [employee, setEmployee] = useState();
  const [mode, setMode] = useState("add");

  const { data, error } = useGetEmployeesQuery({
    refetchOnMountOrArgChange: true,
  });
  const [deleteEmployee, { isSuccess: deleteSuccess }] =
    useDeleteEmployeeMutation();

  useEffect(() => {
    data && setEmployees(JSON.parse(JSON.stringify(data)));
  }, [data]);

  useEffect(() => {
    if (deleteSuccess) {
      setAlertMsgType("success");
      setAlertVisible(true);
      setAlertMsg("Successfully deleted employee.");
    }
  }, [deleteSuccess]);

  useEffect(() => {
    if (error) {
      setAlertMsgType("error");
      setAlertVisible(true);
      setAlertMsg(
        "Sorry, you do not have permission to view data in this page!"
      );
      const user = getCurrentUser();

      if (
        user &&
        error.response &&
        error.response.status === 401 &&
        (user.roles.includes("ROLE_SUPER_ADMIN") ||
          user.roles.includes("ROLE_HR_MANAGER"))
      ) {
        EventBus.dispatch("logout");
      }
    }
  }, [error]);

  const resetData = () => {
    setEmployee({
      allocatedSiteId: "",
      name: "",
      type: "INTERNAL",
      companyId: "",
      address: "",
      dob: new Date(),
      designation: "",
      empId: "",
    });
  };

  const columns = [
    { title: "E_ID", field: "empId" },
    { title: "Name", field: "name" },
    { title: "Type", field: "type" },
    { title: "Site", field: "allocatedSiteId" },
    { title: "Designation", field: "designation" },
  ];

  const user = getCurrentUser();
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="reports">
      <div className="employeeListWrapper">
        <h1>Manage Employees</h1>
        <div className="addEmployeeBtn">
          <Button
            disabled={!!error}
            variant="contained"
            onClick={() => {
              setMode("add");
              resetData();
              setOpen(true);
            }}
          >
            Add Employee
          </Button>
        </div>
      </div>
      {alertVisible && (
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Alert severity={alertMsgType} onClose={() => setAlertVisible(false)}>
            {alertMsg}
          </Alert>
        </div>
      )}
      <div className="empTable">
        <ThemeProvider theme={defaultMaterialTheme}>
          {employees && (
            <MaterialTable
              title="Employees List"
              columns={columns}
              data={employees}
              icons={tableIcons}
              options={{
                actionsColumnIndex: -1,
              }}
              actions={[
                {
                  icon: VisibilityIcon,
                  tooltip: "View",
                  onClick: (event, rowData) => {
                    setMode("view");
                    setEmployee(rowData);
                    setOpen(true);
                  },
                },
                {
                  icon: tableIcons.Edit,
                  tooltip: "Edit",
                  onClick: (event, rowData) => {
                    setMode("edit");
                    setEmployee(rowData);
                    setOpen(true);
                  },
                },
                {
                  icon: tableIcons.Delete,
                  tooltip: "Delete",
                  onClick: (event, rowData) => {
                    setEmployee(rowData);
                    setDialogVisible(true);
                  },
                },
              ]}
            />
          )}
        </ThemeProvider>
      </div>
      <AddEmployee
        employee={employee}
        open={open}
        mode={mode}
        setAlertVisible={setAlertVisible}
        setAlertMsg={setAlertMsg}
        handleClose={() => setOpen(false)}
      />
      <ConfirmDialog
        content="Are you sure you want to delete this Employee? This action cannot be undone."
        title="Delete Employee"
        dialogVisible={dialogVisible}
        setDialogVisible={setDialogVisible}
        onConfirm={() => {
          deleteEmployee(employee.id);
        }}
      />
    </div>
  );
};

export default EmployeeList;
