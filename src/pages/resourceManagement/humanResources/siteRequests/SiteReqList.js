import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, TextField, Button } from "@mui/material";

import "src/pages/resourceManagement/humanResources/employeeDetails/EmployeeList.css";
import {
  useGetSiteReqsQuery,
  useMarkCompleteSiteReqMutation,
} from "src/api/apiSlice";

const SiteReqList = () => {
  const { data, isLoading } = useGetSiteReqsQuery();
  const [markCompleteSiteReq] = useMarkCompleteSiteReqMutation();

  return (
    <div className="reports">
      <div className="employeeListWrapper">
        <h1>Site Requests</h1>
      </div>
      {data &&
        data
          .filter((i) => i.siteRequestType === "HUMAN")
          .map((req) => (
            <div className="reqWrapper">
              <Grid container spacing={2}>
                <Grid item xs={1}>
                  Date:
                </Grid>
                <Grid item xs={11}>
                  <b> {req.date && req.date.split("T")[0]}</b>
                </Grid>
                <Grid item xs={1}>
                  Site:
                </Grid>
                <Grid item xs={11}>
                  <b> {req.siteId}</b>
                </Grid>
                <Grid item xs={1}>
                  Request:
                </Grid>
                <Grid item xs={11}>
                  <b> {req.description}</b>
                </Grid>
              </Grid>
              {req.complete ? (
                <>
                  <div className="completed">COMPLETED</div>
                  <div
                    className="undoOrReject"
                    onClick={() => {
                      markCompleteSiteReq({ id: req.id, isComplete: false });
                    }}
                  >
                    UNDO
                  </div>
                </>
              ) : (
                <Button
                  sx={{
                    borderRadius: "5px",
                    backgroundColor: "darkBlue",
                    float: "right",
                    marginTop: "-40px",
                  }}
                  variant="contained"
                  onClick={() => {
                    markCompleteSiteReq({ id: req.id, isComplete: true });
                  }}
                >
                  Mark as Complete
                </Button>
              )}
            </div>
          ))}
    </div>
  );
};

export default SiteReqList;
