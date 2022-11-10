import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, TextField, Button } from "@mui/material";

import "src/pages/resourceManagement/humanResources/employeeDetails/EmployeeList.css";
import {
  useApproveDeclineLeaveReqMutation,
  useGetLeaveReqsQuery,
} from "src/api/apiSlice";

const LeaveReqList = () => {
  const { data, isLoading } = useGetLeaveReqsQuery();
  const [approveDeclineLeaveReq] = useApproveDeclineLeaveReqMutation();

  return (
    <div className="reports">
      <div className="employeeListWrapper">
        <h1>Leave Requests</h1>
      </div>
      {data &&
        data.map((req) => (
          <div className="leaveReqWrapper">
            <Grid container spacing={2}>
              <Grid item xs={2}>
                Date:
              </Grid>
              <Grid item xs={10}>
                <b> {req.date && req.date.split("T")[0]}</b>
              </Grid>
              <Grid item xs={2}>
                Emp_ID:
              </Grid>
              <Grid item xs={10}>
                <b> {req.employeeId}</b>
              </Grid>
              <Grid item xs={2}>
                Description:
              </Grid>
              <Grid item xs={10}>
                <b> {req.description}</b>
              </Grid>
            </Grid>
            {req.done ? (
              <>
                <div className={req.approved ? "completed" : "declined"}>
                  {req.approved ? "APPROVED" : "DECLINED"}
                </div>
              </>
            ) : (
              <Grid container spacing={2} sx={{ marginLeft: "40px" }}>
                <Grid item xs={9}></Grid>
                <Grid>
                  <Button
                    sx={{
                      borderRadius: "5px",
                      backgroundColor: "orangered",
                      marginRight: "10px",
                      marginTop: "-40px",
                      "&:hover": { backgroundColor: "#ff7657" },
                    }}
                    variant="contained"
                    onClick={() => {
                      approveDeclineLeaveReq({ id: req.id, isApproved: false });
                    }}
                  >
                    DECLINE
                  </Button>
                </Grid>
                <Grid>
                  <Button
                    sx={{
                      borderRadius: "5px",
                      backgroundColor: "darkBlue",
                      marginTop: "-40px",
                    }}
                    variant="contained"
                    onClick={() => {
                      approveDeclineLeaveReq({ id: req.id, isApproved: true });
                    }}
                  >
                    APPROVE
                  </Button>
                </Grid>
              </Grid>
            )}
          </div>
        ))}
    </div>
  );
};

export default LeaveReqList;
