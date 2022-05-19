import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./maincontainer.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DropDownItem from "../DropDownItem/DropDownItem";
import SelectedCards from "../SelectedCards/SelectedCards";
import Chip from "@mui/material/Chip";
import demoData from "../demodata.json";
import { UserDetailsContext } from "../StateProvider/StateProvider";
function MainContainer() {
  const [displayData, setdisplayData] = useState([]);
  const [searchData, setsearchData] = useState("");
  const [optionData, setoptionData] = useState([]);
  const inputRef = useRef(null);
  const loadDisplayData = useCallback(() => {
    if (localStorage.getItem("displayData") !== null) {
      let data = JSON.parse(localStorage.getItem("displayData"));
      setdisplayData(data);
    }
  }, []);

  const {
    dropdownDisplay,
    changeDropDownDisplay,
    selectedData,
    chageSelectedData,
  } = useContext(UserDetailsContext);

  const setSearchedData = useCallback(
    (newSearchData) => {
      clearTimeout(inputRef.current);
      inputRef.current = setTimeout(() => {
        setsearchData(newSearchData);
      }, 500);
    },
    [searchData]
  );

  const handleDelete = useCallback(
    (userId) => {
      let newSelectedData = selectedData.filter(({ id }) => id !== userId);
      chageSelectedData(newSelectedData);
    },
    [selectedData]
  );

  useEffect(() => {
    loadDisplayData();
  }, [displayData]);

  useEffect(() => {
    if (searchData.length > 0) {
      let optionarray = demoData.filter(
        ({ first_name, last_name, email }) =>
          first_name.toLowerCase().startsWith(searchData.toLowerCase()) ||
          last_name.toLowerCase().startsWith(searchData.toLowerCase()) ||
          email.toLowerCase().startsWith(searchData.toLowerCase())
      );

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
  }, [searchData, dropdownDisplay,selectedData]);

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
                style={{ margin: "5px" }}
              />
            ))}
            <div className="searchboxcontainer">
              <TextField
                id="standard-basic"
                placeholder="Add by Name or email"
                variant="standard"
                onChange={(event) => setSearchedData(event.target.value)}
                InputProps={{
                  disableUnderline: true,
                }}
                style={{ width: "100%", marginLeft: "10px" }}
              />
            </div>
          </div>
        </div>
        <div className="submitbtncontainer">
          <Button
            style={{ textTransform: "none" }}
            variant="contained"
            disableElevation
            sx={{
              backgroundColor: "darkBlue",
              width: "200px",
              fontFamily: "sans-serif",
              fontSize: "20px",
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
