import "./App.css";
import React from "react";

import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Overview from "./pages/Overview";
import { Reports, ReportsOne, ReportsTwo, ReportsThree } from "./pages/Reports";
import Team from "./pages/Team";
import EmployeeList from "./pages/resourceManagement/humanResources/employeeDetails/EmployeeList";

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
        <Route path="/resources/leave-requests" exact component={ReportsTwo} />
        <Route path="/resources/site-requests" exact component={ReportsThree} />
        <Route path="/team" exact component={Team} />
      </Switch>
    </Router>
  );
}

export default App;
