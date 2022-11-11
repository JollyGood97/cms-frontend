import React, { useEffect, useState } from "react";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import DatePicker from "react-datepicker";
import Box from "@mui/material/Box";

import "./add-contract.css";

const style = {
  position: "absolute",
  top: "54%",
  left: "61%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  flexGrow: 1,
};

const AddContract = (props) => {
  const { open, handleClose } = props;

  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());

  const [contractData, setContractData] = useState({
    customerName: "",
    contactNumber: "",
    address: "",
    contractType: "",
    startDate: "",
    budget: 0,
  });

  const handleContractChanges = (e) => {
    e.preventDefault();
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const newContractData = { ...contractData };
    newContractData[fieldName] = fieldValue;
    if (!newContractData.contractType) {
      newContractData.contractType = "Reimbursement";
    }
    setContractData(newContractData);
  };

  const getRequestObject = () => {
    return contractData.contractType === "Reimbursement"
      ? {
          contractStatus: "ready",
          customer: {
            name: contractData.customerName,
            contactNumber: contractData.contactNumber,
          },
          address: contractData.address,
          contractType: contractData.contractType,
          startDate: startDate.toLocaleDateString("en-US"),
          budget: contractData.budget,
          milestones: [],
        }
      : {
          contractStatus: "ready",
          customer: {
            name: contractData.customerName,
            contactNumber: contractData.contactNumber,
          },
          budget: contractData.budget,
          address: contractData.address,
          contractType: contractData.contractType,
          startDate: startDate.toLocaleDateString("en-US"),
          milestones: [],
        };
  };

  const addContractData = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(getRequestObject()),
    };

    fetch(
      process.env.REACT_APP_BASE_URL +
        "/contracts/" +
        contractData.contractType,
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((responseJson) => {
        setContractData({
          customerName: "",
          contactNumber: "",
          address: "",
          contractType: "",
          startDate: "",
          budget: 0,
        });
        // toast.success("Contract added successfully!", {
        //   position: "top-center",
        //   autoClose: 3000,
        //   hideProgressBar: true,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
      })
      .catch((error) => {
        // toast.error("Error, could not add Contract!", {
        //   position: "top-center",
        //   autoClose: 3000,
        //   hideProgressBar: true,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
      });
    navigate("/contract");
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="addContract">
          <div className="mainContainer">
            <form style={{ display: "flex", flexDirection: "column" }}>
              <h1> Add new contract </h1>
              <div>
                <label> Customer Name: </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  name="customerName"
                  value={contractData.customerName}
                  onChange={handleContractChanges}
                />
              </div>
              <div>
                <label> Customer contact number: </label>
                <input
                  type="text"
                  required
                  placeholder="contact number"
                  name="contactNumber"
                  value={contractData.contactNumber}
                  onChange={handleContractChanges}
                />
              </div>
              <div>
                <label> Address: </label>
                <textarea
                  required
                  placeholder="Address"
                  name="address"
                  value={contractData.address}
                  onChange={handleContractChanges}
                />
              </div>
              <div>
                <label> Contract Type</label>
                <select
                  name="contractType"
                  onChange={handleContractChanges}
                  defaultValue={"Reimbursement"}
                >
                  <option value="Fixed">Fixed-price contract</option>
                  <option value="Reimbursement">
                    Cost-reimbursement contract
                  </option>
                </select>
              </div>
              {contractData.contractType === "Fixed" ? (
                <div>
                  <label> Approx. Budget: </label>
                  <input
                    required
                    placeholder="Budget"
                    name="budget"
                    value={contractData.budget}
                    onChange={handleContractChanges}
                  />
                </div>
              ) : (
                <div></div>
              )}
              <div>
                <label>Start date</label>
                <DatePicker
                  selected={startDate}
                  name="startDate"
                  onChange={(date) => {
                    setStartDate(date);
                  }}
                  dateFormat="dd/MM/yyyy"
                />
              </div>
              <button onClick={addContractData}> Submit </button>
            </form>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default AddContract;
