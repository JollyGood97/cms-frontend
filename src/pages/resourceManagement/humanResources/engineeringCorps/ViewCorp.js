import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { Box, Typography, Grid, TextField, Button } from "@mui/material";

import "src/pages/resourceManagement/humanResources/employeeDetails/EmployeeList.css";
import { useGetEmployeesByCorpQuery } from "src/api/apiSlice";

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

const ViewCorp = (props) => {
  const { open, handleClose, corp } = props;
  const { data, isLoading } = useGetEmployeesByCorpQuery(corp && corp.id);

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
              Company: &ensp; <b> {corp && corp.companyName}</b>
            </Box>
            <Box>
              Eng. Corp ID:&ensp; <b> {corp && corp.engCorpId}</b>
            </Box>
          </Box>
          <Box sx={{ marginTop: "30px" }}>
            <Box className="compRow">
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <b>EmployeeID</b>
                </Grid>
                <Grid item xs={10}>
                  <b> Name</b>
                </Grid>
              </Grid>
            </Box>
            {data &&
              data.map((employee, key) => (
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
                      {employee.empId}
                    </Grid>
                    <Grid item xs={10}>
                      {employee.name}
                    </Grid>
                  </Grid>
                </Box>
              ))}
          </Box>

          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
              marginTop: "20px",
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

export default ViewCorp;
