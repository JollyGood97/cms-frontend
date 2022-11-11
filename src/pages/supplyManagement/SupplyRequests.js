// @ts-nocheck
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import MaterialTable from "material-table";
import { useGetSuppliersQuery } from "src/api/apiSlice";
import "src/pages/resourceManagement/humanResources/employeeDetails/EmployeeList.css";
import { ThemeProvider, createTheme } from "@mui/material";
import tableIcons from "src/components/MaterialTableIcons";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Alert from "@mui/material/Alert";
import AddEditSupplier from "./AddEditSupplier";
const defaultMaterialTheme = createTheme();

const SupplyRequests = () => {
  const { data, error } = useGetSuppliersQuery({
    refetchOnMountOrArgChange: true,
  });
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertMsgType, setAlertMsgType] = useState("");
  const [suppliers, setSuppliers] = useState();
  const [supplier, setSupplier] = useState();
  const [mode, setMode] = useState("add");

  useEffect(() => {
    data && setSuppliers(JSON.parse(JSON.stringify(data)));
  }, [data]);

  // useEffect(() => {
  //   if (deleteSuccess) {
  //     setAlertMsgType("success");
  //     setAlertVisible(true);
  //     setAlertMsg("Successfully deleted Supplier.");
  //   }
  // }, [deleteSuccess]);

  const resetData = () => {
    setSupplier({
      supplier_id: "",
      supplier_name: "",
      supplier_address: "",
      supplier_contact_no: "",
      supplier_account: "",
      supplier_remark: "",
    });
  };

  const columns = [
    { title: "Supplier_ID", field: "supplier_id" },
    { title: "Name", field: "supplier_name" },
    { title: "Address", field: "supplier_address" },
    { title: "Contact No", field: "supplier_contact_no" },
  ];

  return (
    <div className="reports">
      <div className="employeeListWrapper">
        <h1>Manage Suppliers</h1>
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
            Add Supplier
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
          {suppliers && (
            <MaterialTable
              title="Eng Corps List"
              columns={columns}
              data={suppliers}
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
                    setSupplier(rowData);
                    setViewOpen(true);
                  },
                },
                {
                  icon: tableIcons.Edit,
                  tooltip: "Edit",
                  onClick: (event, rowData) => {
                    setMode("edit");
                    setSupplier(rowData);
                    setOpen(true);
                  },
                },
                {
                  icon: tableIcons.Delete,
                  tooltip: "Delete",
                  onClick: (event, rowData) => {
                    setSupplier(rowData);
                    setDialogVisible(true);
                  },
                },
              ]}
            />
          )}
        </ThemeProvider>
      </div>
      <AddEditSupplier
        supplier={supplier}
        open={open}
        mode={mode}
        setAlertVisible={setAlertVisible}
        setAlertMsg={setAlertMsg}
        handleClose={() => setOpen(false)}
      />
      {/* <ViewCorp
        corp={corp}
        open={viewOpen}
        handleClose={() => setViewOpen(false)}
      /> */}
      {/* <ConfirmDialog
        content="Are you sure you want to delete this Corp? All the employees belonging to this company will also be deleted!"
        title="Delete Engineering Corp"
        dialogVisible={dialogVisible}
        setDialogVisible={setDialogVisible}
        onConfirm={() => {
          deleteCorp(corp.id);
        }}
      /> */}
    </div>
  );
};

export default SupplyRequests;
