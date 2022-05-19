import React, { useCallback, useContext, useEffect, useState } from "react";
import "./maincontainer.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DropDownItem from "../DropDownItem/DropDownItem";
import SelectedCards from "../SelectedCards/SelectedCards";
import Chip from "@mui/material/Chip";
import demoData from "../demodata.json";
import { UserDetailsContext } from "../StateProvider/StateProvider";
function MainContainer() {
  const [searchData, setsearchData] = useState("");
  const [optionData, setoptionData] = useState([]);
  const [displayData, setdisplayData] = useState([]);
  const {
    dropdownDisplay,
    changeDropDownDisplay,
    selectedData,
    changeSelectedData,
    addingDeletingCount,
    changeAddingDeletingCount,
  } = useContext(UserDetailsContext);

  const loadDisplayData = useCallback(() => {
    if (localStorage.getItem("displayData") !== null) {
      let data = JSON.parse(localStorage.getItem("displayData"));
      setdisplayData(data);
    }
  }, [setdisplayData]);

  const setSearchedData = useCallback((newSearchData) => {
    setsearchData(newSearchData);
  }, []);

  const handleDelete = useCallback(
    (userId) => {
      let newSelectedData = selectedData.filter(({ id }) => id !== userId);
      changeSelectedData(newSelectedData);
    },
    [selectedData, changeSelectedData]
  );

  const saveDisplayData = useCallback(() => {
    if (localStorage.getItem("displayData") !== null) {
      let currentdata = JSON.parse(localStorage.getItem("displayData"));
      selectedData.forEach((element) => {
        currentdata.push(element);
      });
      localStorage.setItem("displayData", JSON.stringify(currentdata));
      changeSelectedData([]);
      changeDropDownDisplay("none");
      setsearchData("");
      setoptionData([]);
      changeAddingDeletingCount(addingDeletingCount + 1);
    } else {
      let addingData = JSON.stringify(selectedData);
      console.log(addingData);
      localStorage.setItem("displayData", addingData);
      changeSelectedData([]);
      changeDropDownDisplay("none");
      setsearchData("");
      setoptionData([]);
      changeAddingDeletingCount(addingDeletingCount + 1);
    }
  }, [
    selectedData,
    changeDropDownDisplay,
    changeSelectedData,
    setoptionData,
    addingDeletingCount,
    changeAddingDeletingCount,
  ]);

  useEffect(() => {
    loadDisplayData();
  }, [addingDeletingCount]);

  const searchDataFunction = useCallback(() => {
    if (searchData.length > 0) {
      let optionarray = [];
      if (displayData.length > 0) {
        optionarray = demoData.filter(
          ({ id, first_name, last_name, email }) =>
            !displayData.find((object) => object.id === id) &&
            (first_name.toLowerCase().startsWith(searchData.toLowerCase()) ||
              last_name.toLowerCase().startsWith(searchData.toLowerCase()) ||
              email.toLowerCase().startsWith(searchData.toLowerCase()))
        );
      } else {
        optionarray = demoData.filter(
          ({ first_name, last_name, email }) =>
            first_name.toLowerCase().startsWith(searchData.toLowerCase()) ||
            last_name.toLowerCase().startsWith(searchData.toLowerCase()) ||
            email.toLowerCase().startsWith(searchData.toLowerCase())
        );
      }
      let displayoptionarray = optionarray.filter(
        (object) => !selectedData.includes(object)
      );
      if (displayoptionarray.length > 0) {
        changeDropDownDisplay("block");
        setoptionData(displayoptionarray);
      } else {
        setoptionData([]);
        changeDropDownDisplay("none");
      }
    } else {
      setoptionData([]);
      changeDropDownDisplay("none");
    }
  }, [searchData, selectedData, changeDropDownDisplay, displayData]);

  useEffect(() => {
    searchDataFunction();
  }, [searchData, selectedData]);

  return (
    <div className="maincontainer">
      <span className="container-heading">Customer Success Managers</span>
      <div className="search-add-container">
        <div className="leftbox">
          <div className="searcheditemcontainer">
            {selectedData.map(({ id, first_name, last_name }) => (
              <Chip
                key={id}
                label={first_name + " " + last_name}
                onDelete={() => handleDelete(id)}
                className="chips"
                style={{
                  margin: "5px",
                  backgroundColor: "#d8dcfc",
                  color: "#1a33a2",
                  fontWeight: "bold",
                  borderRadius: "5px",
                }}
              />
            ))}
            <div className="searchboxcontainer">
              <TextField
                id="standard-basic"
                placeholder="Add by Name or email"
                variant="standard"
                value={searchData}
                className="textfieldsearch"
                onChange={(event) => setSearchedData(event.target.value)}
                InputProps={{
                  disableUnderline: true,
                }}
                style={{
                  minWidth: "100%",
                }}
              />
            </div>
          </div>
        </div>
        <div className="submitbtncontainer">
          <Button
            style={{ textTransform: "none" }}
            variant="contained"
            disableElevation
            onClick={saveDisplayData}
            className="buttonmui"
            sx={{
              backgroundColor: "darkBlue",
              fontFamily: "sans-serif",
              fontSize: "18px",
            }}
          >
            Add CSM
          </Button>
        </div>
      </div>
      <div
        className="dropdowncontainer"
        style={{ display: `${dropdownDisplay}` }}
      >
        <div className="dropdown">
          {optionData.map(
            ({ id, first_name, last_name, job_description, email }) => (
              <DropDownItem
                key={id}
                id={id}
                username={first_name + " " + last_name}
                useroccupation={job_description}
                useremmail={email}
              />
            )
          )}
        </div>
      </div>
      <div className="selectedcardscontainer">
        {displayData.map(({ id, first_name, last_name, job_description }) => (
          <SelectedCards
            key={id}
            id={id}
            username={first_name + " " + last_name}
            useroccupation={job_description}
          />
        ))}
      </div>
    </div>
  );
}

export default MainContainer;
