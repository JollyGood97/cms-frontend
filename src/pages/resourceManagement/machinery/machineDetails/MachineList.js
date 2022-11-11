// @ts-nocheck
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import AddEditMachine from "./AddEditMachine";
import tableIcons from "src/components/MaterialTableIcons";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Alert from "@mui/material/Alert";

import {
  useGetMachinesQuery,
  useDeleteMachineMutation,
} from "src/api/apiSlice";
import ConfirmDialog from "src/components/ConfirmDialog";
import "src/pages/resourceManagement/Machine.css";
import { getCurrentUser } from "src/util/Util";
import EventBus from "src/EventBus";
const defaultMaterialTheme = createTheme();

const MachineList = () => {
  const [open, setOpen] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertMsgType, setAlertMsgType] = useState("");

  const [machines, setMachines] = useState();
  const [machine, setMachine] = useState();
  const [mode, setMode] = useState("add");

  const { data, error } = useGetMachinesQuery({
    refetchOnMountOrArgChange: true,
  });
  const [deleteMachine, { isSuccess: deleteSuccess }] =
    useDeleteMachineMutation();

  useEffect(() => {
    data && setMachines(JSON.parse(JSON.stringify(data)));
  }, [data]);

  useEffect(() => {
    if (deleteSuccess) {
      setAlertVisible(true);
      setAlertMsgType("success");
      setAlertMsg("Successfully deleted machine.");
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
          user.roles.includes("ROLE_MACHINE_MANAGER"))
      ) {
        EventBus.dispatch("logout");
      }
    }
  }, [error]);

  const resetData = () => {
    setMachine({
      allocatedSiteId: "",
      name: "",
      type: "OWNED",
      companyId: "",
      machineId: "",
    });
  };

  const columns = [
    { title: "Machine_ID", field: "machineId" },
    { title: "Category", field: "name" },
    { title: "Type", field: "type" },
    { title: "Site", field: "allocatedSiteId" },
  ];

  return (
    <div className="reports">
      <div className="employeeListWrapper">
        <h1>Manage Machines</h1>
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
            Add Machine
          </Button>
        </div>
      </div>
      {alertVisible && (
        <Alert severity={alertMsgType} onClose={() => setAlertVisible(false)}>
          {alertMsg}
        </Alert>
      )}
      <div className="empTable">
        <ThemeProvider theme={defaultMaterialTheme}>
          {machines && (
            <MaterialTable
              title="Machines List"
              columns={columns}
              data={machines}
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
                    setMachine(rowData);
                    setOpen(true);
                  },
                },
                {
                  icon: tableIcons.Edit,
                  tooltip: "Edit",
                  onClick: (event, rowData) => {
                    setMode("edit");
                    setMachine(rowData);
                    setOpen(true);
                  },
                },
                {
                  icon: tableIcons.Delete,
                  tooltip: "Delete",
                  onClick: (event, rowData) => {
                    setMachine(rowData);
                    setDialogVisible(true);
                  },
                },
              ]}
            />
          )}
        </ThemeProvider>
      </div>
      <AddEditMachine
        machine={machine}
        open={open}
        mode={mode}
        setAlertVisible={setAlertVisible}
        setAlertMsg={setAlertMsg}
        handleClose={() => setOpen(false)}
      />
      <ConfirmDialog
        content="Are you sure you want to delete this Machine? This action cannot be undone."
        title="Delete Machine"
        dialogVisible={dialogVisible}
        setDialogVisible={setDialogVisible}
        onConfirm={() => {
          deleteMachine(machine.id);
        }}
      />
    </div>
  );
};

export default MachineList;
