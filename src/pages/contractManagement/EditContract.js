import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

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

const EditContract = (props) => {
  const { open, handleClose, contractId, setAlertMsg, setAlert, setAlertType } =
    props;
  const navigate = useNavigate();

  const [contractStatus, setContractStatus] = useState("ready");
  const [startDate, setStartDate] = useState(new Date());
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [milestoneData, setMilestoneData] = useState({
    status: "",
    milestoneName: "",
    startDate: "",
    deliveryDate: "",
  });

  const updateContractStatus = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contractStatus: contractStatus,
      }),
    };

    fetch(
      process.env.REACT_APP_BASE_URL + "/contracts/status/" + contractId,
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((responseJson) => {
        setAlertMsg("Contract status updated successfully!");
        setAlertType("success");
        setAlert(true);
      })
      .catch((error) => {
        setAlertMsg("Error! Couldn't update contract");
        setAlertType("error");
        setAlert(true);
      });
    navigate("/contract");
  };

  const handleContractStatus = (e) => {
    setContractStatus(e.target.value);
  };

  const handleMilestoneChanges = (e) => {
    e.preventDefault();
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const newMilestoneData = { ...milestoneData };
    newMilestoneData[fieldName] = fieldValue;
    setMilestoneData(newMilestoneData);
  };

  const addMilestoneData = (e) => {
    e.preventDefault();
    const resObject = {
      milestone: {
        status: milestoneData.status,
        milestoneName: milestoneData.milestoneName,
        startDate: startDate,
        deliveryDate: deliveryDate,
      },
    };

    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resObject),
    };

    fetch(
      process.env.REACT_APP_BASE_URL + "/contracts/milestone/add/" + contractId,
      requestOptions
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
      })
      .then((responseJson) => {
        setMilestoneData({
          status: "",
          milestoneName: "",
          startDate: "",
          deliveryDate: "",
        });
        setAlertMsg("Milestone added successfully!");
        setAlertType("success");
        setAlert(true);
      })
      .catch((error) => {
        setAlertMsg("Error! Couldn't add milestone");
        setAlertType("error");
        setAlert(true);
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
        <div className="mainContainer">
          <div className="addMilestoneContainer">
            <form style={{ display: "flex", flexDirection: "column" }}>
              <h1> Add new milestone </h1>
              <div>
                <label> Milestone name: </label>
                <input
                  type="text"
                  placeholder="Enter Miletsone name"
                  name="milestoneName"
                  value={milestoneData.milestoneName}
                  onChange={handleMilestoneChanges}
                />
              </div>
              <div>
                <label> Milestone status</label>
                <select
                  name="status"
                  onChange={handleMilestoneChanges}
                  defaultValue={"ready"}
                >
                  <option value="ready">Ready</option>
                  <option value="inprogress">In-progress</option>
                  <option value="completed">Completed</option>
                  <option value="onhold">On-hold</option>
                </select>
              </div>

              <button onClick={addMilestoneData}> Submit </button>
            </form>
          </div>
          <div
            className="updateStatusContainer"
            style={{ marginTop: "12%", marginLeft: "10%" }}
          >
            <div>
              <label>Start date</label>
              <TextField
                id="date"
                type="date"
                value={startDate.toISOString().slice(0, 10)}
                size="small"
                sx={{ width: 220, marginBottom: "40px", marginTop: "5px" }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => {
                  setStartDate(new Date(event.target.value));
                }}
              />
            </div>
            <div>
              <label>Delivery date</label>
              <TextField
                id="date"
                type="date"
                value={deliveryDate.toISOString().slice(0, 10)}
                size="small"
                sx={{ width: 220, marginTop: "5px" }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(event) => {
                  setDeliveryDate(new Date(event.target.value));
                }}
              />
            </div>
          </div>
        </div>
        <hr
          style={{
            background: "grey",
            width: "100%",
            color: "grey",
            borderColor: "grey",
            height: "3px",
            marginTop: "50px",
            marginLeft: "10px",
            alignSelf: "center",
          }}
        />
        <div
          className="mainContainer"
          style={{ marginLeft: "7%", marginTop: "5%" }}
        >
          <div className="updateStatusContainer">
            <div className="contractStatusCon">
              <label> Contract Status: </label>
              <select
                name="contractStatus"
                onChange={handleContractStatus}
                defaultValue={"ready"}
              >
                <option value="ready">Ready</option>
                <option value="inprogress">In-progress</option>
                <option value="suspended">Suspended</option>
                <option value="completed">Completed</option>
              </select>
              <button
                style={{ marginTop: "10px", height: "45px", fontSize: "17px" }}
                onClick={updateContractStatus}
              >
                Update status
              </button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default EditContract;
