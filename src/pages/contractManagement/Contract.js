// @ts-nocheck
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddContract from "./AddContract";
import "./contracts.css";
import EditContract from "./EditContract";
import Alert from "@mui/material/Alert";

const Contract = () => {
  const navigate = useNavigate();
  // const [contracts, setContracts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openE, setOpenE] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");

  const [contractId, setContractId] = useState("");

  React.useEffect(() => {
    getAllContracts();
  }, []);

  const getAllContracts = () => {
    // fetch(process.env.REACT_APP_BASE_URL + "/contracts")
    //   .then((response) => response.json())
    //   .then((data) => setContracts(data))
    //   .catch((error) => {
    //     console.log("Error fetching data");
    //   });
  };
  const contracts = [
    {
      contractId: "g2pcc11fol9zvzk7i",
      contractStatus: "suspended",
      projectConstructor: {
        name: "John Smith",
        contactNumber: "0712232543",
        contracts: ["4jbsjdfb756ba", "4jbsjdf2h7jba", "4jbdsjdfb2jba"],
      },
      customer: {
        name: "Sanju Sams",
        contactNumber: "0742311890",
      },
      address: "No. 54, Bokur, kott",
      contractType: "Reimbursement",
      startDate: "2023-08-25",
      milestones: [
        {
          status: "ready",
          milestoneName: "Living room",
          startDate: "2023-09-21",
          deliveryDate: "2023-12-25",
        },
        {
          status: "ready",
          milestoneName: "Kitchen",
          startDate: "2024-01-21",
          deliveryDate: "2024-05-18",
        },
      ],
    },
  ];
  return (
    <div className="home">
      <h1>Contract</h1>
      <div className="contracts">
        <div className="button-container">
          <button onClick={() => setOpen(true)}> Add new contract </button>
        </div>
        {alert && (
          <div style={{ marginTop: "10px", marginBottom: "10px" }}>
            <Alert severity={alertType} onClose={() => setAlert(false)}>
              {alertMsg}
            </Alert>
          </div>
        )}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Contract ID</th>
                <th>Customer Name</th>
                <th>Address</th>
                <th>Created Data</th>
                <th>Contract Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contracts.length > 0 &&
                contracts.map((contract) => (
                  <tr key={contract.contractId}>
                    <td>{contract.contractId}</td>
                    <td>{contract.customer.name}</td>
                    <td>{contract.address}</td>
                    <td>{contract.startDate}</td>
                    <td>{contract.contractType}</td>
                    <td>
                      <div
                        style={{
                          padding: "10px",
                          backgroundColor:
                            contract.contractStatus === "ready"
                              ? "green"
                              : contract.contractStatus === "inprogress"
                              ? "blue"
                              : "red",
                          borderRadius: "10px",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        {contract.contractStatus}
                      </div>
                    </td>
                    <td>
                      <button
                        key={contract.contractId}
                        className="editButton"
                        type="button"
                        onClick={() => {
                          setContractId(contract.contractId);
                          setOpenE(true);
                        }}
                        style={{
                          backgroundColor: "grey",
                          color: "black",
                          border: "none",
                          padding: "10px",
                          borderRadius: "10px",
                          fontSize: "15px",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      {/* <button
                        onClick={() => {}}
                        style={{
                          backgroundColor: "grey",
                          color: "black",
                          border: "none",
                          padding: "10px",
                          borderRadius: "10px",
                          fontSize: "15px",
                          fontWeight: "bold",
                          marginLeft: "10px",
                        }}
                      >
                        View Milestones
                      </button> */}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddContract
        open={open}
        handleClose={() => setOpen(false)}
        setAlertMsg={setAlertMsg}
        setAlert={setAlert}
        setAlertType={setAlertType}
      />
      <EditContract
        open={openE}
        handleClose={() => setOpenE(false)}
        contractId={contractId}
        setAlertMsg={setAlertMsg}
        setAlert={setAlert}
        setAlertType={setAlertType}
      />
    </div>
  );
};

export default Contract;
