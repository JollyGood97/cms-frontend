import React from "react";
import Modal from "@mui/material/Modal";
import { Box, Grid, Button } from "@mui/material";

import { useGetMachinesByRentalQuery } from "src/api/apiSlice";
import "src/pages/resourceManagement/Machine.css";

const style = {
  position: "absolute",
  top: "54%",
  left: "61%",
  transform: "translate(-50%, -50%)",
  width: "74%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  flexGrow: 1,
};

const ViewRental = (props) => {
  const { open, handleClose, rental } = props;
  const { data } = useGetMachinesByRentalQuery(rental && rental.id);

  const categories = data && data.map((machine) => machine.name);
  const counts =
    categories &&
    categories.reduce((map, val) => {
      map[val] = (map[val] || 0) + 1;
      return map;
    }, {});

  return (
    <div className="employeeListWrapper">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box className="compWrapper">
            <Box>
              Company: &ensp; <b> {rental && rental.companyName}</b>
            </Box>
            <Box>
              Machinery Rental ID:&ensp;{" "}
              <b> {rental && rental.machineryRentalId}</b>
            </Box>
          </Box>
          <Box sx={{ marginTop: "30px" }}>
            <Box className="compRow">
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <b>MachineID</b>
                </Grid>
                <Grid item xs={10}>
                  <b> Category</b>
                </Grid>
              </Grid>
            </Box>
            {data &&
              data.map((machine, key) => (
                <Box
                  className="compRow"
                  sx={{
                    borderBottomWidth: `${
                      key === data.length - 1 ? "1px" : "0px"
                    }`,
                  }}
                  key={key}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      {machine.machineId}
                    </Grid>
                    <Grid item xs={10}>
                      {machine.name}
                    </Grid>
                  </Grid>
                </Box>
              ))}
          </Box>

          <Box sx={{ marginTop: "40px", width: "55%" }}>
            <Box
              className="compRow"
              sx={{
                border: "1px solid black",
                borderTopWidth: "0px",
                borderLeftWidth: "0px",
                borderRightWidth: "0px",
              }}
            >
              <Grid container>
                <Grid item xs={4}>
                  <b>Category</b>
                </Grid>
                <Grid item xs={3}>
                  <b> Quantity</b>
                </Grid>
              </Grid>
            </Box>
            {counts &&
              Object.entries(counts).map((item, key) => (
                <Box
                  className="compRow"
                  sx={{
                    border: "1px solid black",
                    borderTopWidth: "0px",
                    borderLeftWidth: "0px",
                    borderRightWidth: "0px",
                  }}
                  key={key}
                >
                  <Grid container>
                    <Grid item xs={4}>
                      {item[0]}
                    </Grid>
                    <Grid item xs={3}>
                      {item[1]}
                    </Grid>
                  </Grid>
                </Box>
              ))}
          </Box>

          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
              marginTop: "40px",
              marginBottom: "20px",
            }}
          >
            <Button
              variant="outlined"
              onClick={() => {
                handleClose();
              }}
              sx={{
                border: "1px solid",
                borderColor: "darkBlue",
                color: "darkBlue",
                marginRight: "20px",
                width: "160px",
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewRental;
