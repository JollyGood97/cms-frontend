import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddContract from "./AddContract";
import "./contracts.css";

const Contract = () => {
  const navigate = useNavigate();
  const [contracts, setContracts] = useState([]);
  const [open, setOpen] = useState(false);

  React.useEffect(() => {
    getAllContracts();
  }, []);

  const getAllContracts = () => {
    fetch(process.env.REACT_APP_BASE_URL + "/contracts")
      .then((response) => response.json())
      .then((data) => setContracts(data))
      .catch((error) => {
        console.log("Error fetching data");
      });
  };

  return (
    <div className="home">
      <h1>Contract</h1>
      <div className="contracts">
        <div className="button-container">
          <button onClick={() => setOpen(true)}> Add new contract </button>
        </div>
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
                          navigate("/contract/edit", {
                            state: {
                              contractId: contract.contractId,
                            },
                          });
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
                      <button
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
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddContract open={open} handleClose={() => setOpen(false)} />
    </div>
  );
};

export default Contract;
