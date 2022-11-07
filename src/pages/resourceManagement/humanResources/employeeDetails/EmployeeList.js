// @ts-nocheck
import "./EmployeeList.css";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import AddEmployee from "./AddEmployee";
import tableIcons from "src/components/MaterialTableIcons";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Alert from "@mui/material/Alert";

import {
  useAddEmployeeMutation,
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
} from "src/api/apiSlice";
import ConfirmDialog from "src/components/ConfirmDialog";

const defaultMaterialTheme = createTheme();

const EmployeeList = () => {
  const [open, setOpen] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const [employees, setEmployees] = useState();
  const [employee, setEmployee] = useState();
  const [mode, setMode] = useState("add");

  const { data, isLoading } = useGetEmployeesQuery({
    refetchOnMountOrArgChange: true,
  });
  const [deleteEmployee, { isSuccess: deleteSuccess }] =
    useDeleteEmployeeMutation();

  useEffect(() => {
    data && setEmployees(JSON.parse(JSON.stringify(data)));
  }, [data]);

  useEffect(() => {
    if (deleteSuccess) {
      setAlertVisible(true);
      setAlertMsg("Successfully deleted employee.");
    }
  }, [deleteSuccess]);

  const resetData = () => {
    setEmployee({
      allocatedSiteId: "",
      name: "",
      type: "INTERNAL",
      companyId: "",
      address: "",
      dob: new Date(),
      designation: "",
    });
  };

  const columns = [
    { title: "Name", field: "name" },
    { title: "Type", field: "type" },
    { title: "Site", field: "allocatedSiteId" },
    { title: "Designation", field: "designation" },
  ];

  return (
    <div className="reports">
      <div className="employeeListWrapper">
        <h1>Manage Employees</h1>
        <div className="addEmployeeBtn">
          <Button
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
        <Alert severity="success" onClose={() => setAlertVisible(false)}>
          {alertMsg}
        </Alert>
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
