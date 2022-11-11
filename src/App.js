import "./App.css";
import React, { useCallback, useEffect } from "react";
import { Outlet } from "react-router";
import Sidebar from "./components/Sidebar";
import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import EmployeeList from "./pages/resourceManagement/humanResources/employeeDetails/EmployeeList";
import CorpsList from "./pages/resourceManagement/humanResources/engineeringCorps/CorpsList";
import SiteReqList from "./pages/resourceManagement/humanResources/siteRequests/SiteReqList";
import MSiteReqList from "./pages/resourceManagement/machinery/siteRequests/SiteReqList";
import LeaveReqList from "./pages/resourceManagement/humanResources/leaveRequests/LeaveReqList";
import MachineList from "./pages/resourceManagement/machinery/machineDetails/MachineList";
import RentalsList from "./pages/resourceManagement/machinery/machineRentals/RentalsList";
import Login from "./pages/login/Login";
import Contract from "./pages/contractManagement/Contract";
import Milestone from "./pages/contractManagement/Milestone";
import SupplyRequests from "./pages/supplyManagement/SupplyRequests";
import EventBus from "./EventBus";

function App() {
  let navigate = useNavigate();

  const logOut = useCallback(() => {
    localStorage.removeItem("user");
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [logOut]);

  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route
        element={
          <>
            <Sidebar />
            <Outlet />
          </>
        }
      >
        <Route path="/contract-management" element={<Contract />} />
        <Route path="/contract-management/contracts" element={<Contract />} />
        <Route path="/contract-management/milestones" element={<Milestone />} />
        <Route path="/resources" element={<EmployeeList />} />
        <Route path="/resources/human" element={<EmployeeList />} />
        <Route path="/resources/human/employees" element={<EmployeeList />} />
        <Route path="/resources/human/corps" element={<CorpsList />} />
        <Route
          path="/resources/human/leave-requests"
          element={<LeaveReqList />}
        />
        <Route
          path="/resources/human/site-requests"
          element={<SiteReqList />}
        />
        <Route path="/resources/machinery/machines" element={<MachineList />} />
        <Route
          path="/resources/machinery/site-requests"
          element={<MSiteReqList />}
        />
        <Route path="/resources/machinery/rentals" element={<RentalsList />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/supplies/suppliers" element={<SupplyRequests />} />
        {/* <Route path="/supplies/supply-requests" element={<SupplyRequests />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
