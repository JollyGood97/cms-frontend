// @ts-nocheck
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import AddRental from "./AddRental";
import tableIcons from "src/components/MaterialTableIcons";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Alert from "@mui/material/Alert";

import { useGetRentalsQuery, useDeleteRentalMutation } from "src/api/apiSlice";
import ConfirmDialog from "src/components/ConfirmDialog";
import ViewRental from "./ViewRental";
import "src/pages/resourceManagement/Machine.css";

const defaultMaterialTheme = createTheme();

const RentalsList = () => {
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const [rentals, setRentals] = useState();
  const [rental, setRental] = useState();
  const [mode, setMode] = useState("add");

  const { data, isLoading } = useGetRentalsQuery({
    refetchOnMountOrArgChange: true,
  });
  const [deleteRental, { isSuccess: deleteSuccess }] =
    useDeleteRentalMutation();

  useEffect(() => {
    data && setRentals(JSON.parse(JSON.stringify(data)));
  }, [data]);

  useEffect(() => {
    if (deleteSuccess) {
      setAlertVisible(true);
      setAlertMsg("Successfully deleted Engineering Cooperation.");
    }
  }, [deleteSuccess]);

  const resetData = () => {
    setRental({
      machineryRentalId: "",
      companyName: "",
    });
  };

  const columns = [
    { title: "Machinery_Rental_ID", field: "machineryRentalId" },
    { title: "Company", field: "companyName" },
  ];

  return (
    <div className="reports">
      <div className="employeeListWrapper">
        <h1>Manage Machinery Rentals</h1>
        <div className="addEmployeeBtn">
          <Button
            variant="contained"
            onClick={() => {
              setMode("add");
              resetData();
              setOpen(true);
            }}
          >
            Add Machinery Rental
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
          {rentals && (
            <MaterialTable
              title="Machinery Rentals List"
              columns={columns}
              data={rentals}
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
                    setRental(rowData);
                    setViewOpen(true);
                  },
                },
                {
                  icon: tableIcons.Edit,
                  tooltip: "Edit",
                  onClick: (event, rowData) => {
                    setMode("edit");
                    setRental(rowData);
                    setOpen(true);
                  },
                },
                {
                  icon: tableIcons.Delete,
                  tooltip: "Delete",
                  onClick: (event, rowData) => {
                    setRental(rowData);
                    setDialogVisible(true);
                  },
                },
              ]}
            />
          )}
        </ThemeProvider>
      </div>
      <AddRental
        rental={rental}
        open={open}
        mode={mode}
        setAlertVisible={setAlertVisible}
        setAlertMsg={setAlertMsg}
        handleClose={() => setOpen(false)}
      />
      <ViewRental
        rental={rental}
        open={viewOpen}
        handleClose={() => setViewOpen(false)}
      />
      <ConfirmDialog
        content="Are you sure you want to delete this Machinery Rental? All the machines belonging to this rental will also be deleted!"
        title="Delete Machinery Rental"
        dialogVisible={dialogVisible}
        setDialogVisible={setDialogVisible}
        onConfirm={() => {
          deleteRental(rental.id);
        }}
      />
    </div>
  );
};

export default RentalsList;
