// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";

import "src/pages/resourceManagement/humanResources/employeeDetails/EmployeeList.css";
import {
  useApproveDeclineLeaveReqMutation,
  useGetLeaveReqsQuery,
} from "src/api/apiSlice";
import Alert from "@mui/material/Alert";
import { getCurrentUser } from "src/util/Util";
import EventBus from "src/EventBus";

const LeaveReqList = () => {
  const { data, error } = useGetLeaveReqsQuery();
  const [approveDeclineLeaveReq] = useApproveDeclineLeaveReqMutation();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertMsgType, setAlertMsgType] = useState("");

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

  return (
    <div className="reports">
      <div className="employeeListWrapper">
        <h1>Leave Requests</h1>
      </div>
      {alertVisible && (
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Alert severity={alertMsgType} onClose={() => setAlertVisible(false)}>
            {alertMsg}
          </Alert>
        </div>
      )}
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
