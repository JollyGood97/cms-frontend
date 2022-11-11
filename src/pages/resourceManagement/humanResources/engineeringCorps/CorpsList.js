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

import {
  useAddEmployeeMutation,
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
  useGetCorpsQuery,
  useDeleteCorpMutation,
} from "src/api/apiSlice";
import ConfirmDialog from "src/components/ConfirmDialog";
import ViewCorp from "./ViewCorp";

const defaultMaterialTheme = createTheme();

const CorpsList = () => {
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const [corps, setCorps] = useState();
  const [corp, setCorp] = useState();
  const [mode, setMode] = useState("add");

  const { data, isLoading } = useGetCorpsQuery({
    refetchOnMountOrArgChange: true,
  });
  const [deleteCorp, { isSuccess: deleteSuccess }] = useDeleteCorpMutation();

  useEffect(() => {
    data && setCorps(JSON.parse(JSON.stringify(data)));
  }, [data]);

  useEffect(() => {
    if (deleteSuccess) {
      setAlertVisible(true);
      setAlertMsg("Successfully deleted Engineering Cooperation.");
    }
  }, [deleteSuccess]);

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
        <Alert severity="success" onClose={() => setAlertVisible(false)}>
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
