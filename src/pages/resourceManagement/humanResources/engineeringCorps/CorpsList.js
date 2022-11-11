// @ts-nocheck
import "src/pages/resourceManagement/humanResources/employeeDetails/EmployeeList.css";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import AddCorp from "./AddCorp";
import tableIcons from "src/components/MaterialTableIcons";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Alert from "@mui/material/Alert";
import { useGetCorpsQuery, useDeleteCorpMutation } from "src/api/apiSlice";
import ConfirmDialog from "src/components/ConfirmDialog";
import ViewCorp from "./ViewCorp";
import { getCurrentUser } from "src/util/Util";
import EventBus from "src/EventBus";
const defaultMaterialTheme = createTheme();

const CorpsList = () => {
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertMsgType, setAlertMsgType] = useState("");

  const [corps, setCorps] = useState();
  const [corp, setCorp] = useState();
  const [mode, setMode] = useState("add");

  const { data, error } = useGetCorpsQuery({
    refetchOnMountOrArgChange: true,
  });
  const [deleteCorp, { isSuccess: deleteSuccess }] = useDeleteCorpMutation();

  useEffect(() => {
    data && setCorps(JSON.parse(JSON.stringify(data)));
  }, [data]);

  useEffect(() => {
    if (deleteSuccess) {
      setAlertMsgType("success");
      setAlertVisible(true);
      setAlertMsg("Successfully deleted Engineering Cooperation.");
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
    setCorp({
      engCorpId: "",
      companyName: "",
    });
  };

  const columns = [
    { title: "Eng_Corp_ID", field: "engCorpId" },
    { title: "Company", field: "companyName" },
  ];

  return (
    <div className="reports">
      <div className="employeeListWrapper">
        <h1>Manage Engineering Corps</h1>
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
            Add Engineering Corp
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
          {corps && (
            <MaterialTable
              title="Eng Corps List"
              columns={columns}
              data={corps}
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
                    setCorp(rowData);
                    setViewOpen(true);
                  },
                },
                {
                  icon: tableIcons.Edit,
                  tooltip: "Edit",
                  onClick: (event, rowData) => {
                    setMode("edit");
                    setCorp(rowData);
                    setOpen(true);
                  },
                },
                {
                  icon: tableIcons.Delete,
                  tooltip: "Delete",
                  onClick: (event, rowData) => {
                    setCorp(rowData);
                    setDialogVisible(true);
                  },
                },
              ]}
            />
          )}
        </ThemeProvider>
      </div>
      <AddCorp
        corp={corp}
        open={open}
        mode={mode}
        setAlertVisible={setAlertVisible}
        setAlertMsg={setAlertMsg}
        handleClose={() => setOpen(false)}
      />
      <ViewCorp
        corp={corp}
        open={viewOpen}
        handleClose={() => setViewOpen(false)}
      />
      <ConfirmDialog
        content="Are you sure you want to delete this Corp? All the employees belonging to this company will also be deleted!"
        title="Delete Engineering Corp"
        dialogVisible={dialogVisible}
        setDialogVisible={setDialogVisible}
        onConfirm={() => {
          deleteCorp(corp.id);
        }}
      />
    </div>
  );
};

export default CorpsList;
