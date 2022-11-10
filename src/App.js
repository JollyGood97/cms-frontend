import "./App.css";
import React from "react";

import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from "./pages/Reports";
import Team from "./pages/Team";
import EmployeeList from "./pages/resourceManagement/humanResources/employeeDetails/EmployeeList";
import CorpsList from "./pages/resourceManagement/humanResources/engineeringCorps/CorpsList";
import SiteReqList from "./pages/resourceManagement/humanResources/siteRequests/SiteReqList";
import MSiteReqList from "./pages/resourceManagement/machinery/siteRequests/SiteReqList";
import LeaveReqList from "./pages/resourceManagement/humanResources/leaveRequests/LeaveReqList";
import MachineList from "./pages/resourceManagement/machinery/machineDetails/MachineList";
import RentalsList from "./pages/resourceManagement/machinery/machineRentals/RentalsList";

function App() {
  return (
    <Router>
      <Sidebar />
      <Switch>
        <Route path="/overview" exact component={Overview} />
        <Route path="/resources" exact component={EmployeeList} />
        <Route path="/resources/human" exact component={EmployeeList} />
        <Route
          path="/resources/human/employees"
          exact
          component={EmployeeList}
        />
        <Route path="/resources/human/corps" exact component={CorpsList} />
        <Route
          path="/resources/human/leave-requests"
          exact
          component={LeaveReqList}
        />
        <Route
          path="/resources/human/site-requests"
          exact
          component={SiteReqList}
        />
        <Route
          path="/resources/machinery/machines"
          exact
          component={MachineList}
        />
        <Route
          path="/resources/machinery/site-requests"
          exact
          component={MSiteReqList}
        />
        <Route
          path="/resources/machinery/rentals"
          exact
          component={RentalsList}
        />
        <Route path="/team" exact component={Team} />
        <Route path="/team" exact component={Team} />
      </Switch>
    </Router>
  );
}

export default App;
