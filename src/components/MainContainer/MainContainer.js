import React from "react";
import "./maincontainer.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DropDownItem from "../DropDownItem/DropDownItem";
import SelectedCards from "../SelectedCards/SelectedCards";
function MainContainer() {
  return (
    <div className="maincontainer">
      <span className="container-heading">Customer Success Managers</span>
      <div className="search-add-container">
        <div className="leftbox">
          <div className="searcheditemcontainer">sudeep</div>
          <div className="searchboxcontainer">
            <TextField
              fullWidth
              id="standard-basic"
              placeholder="Add by Name or email"
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                flex: 1,
              }}
            />
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
      <div className="dropdowncontainer">
        <div className="dropdown">
          <DropDownItem
            username="Sudeep Kumar"
            useroccupation="Student"
            useremmail="sudeepagrawal1999@gmail.com"
          />
          <DropDownItem
            username="Sudeep Kumar"
            useroccupation="Student"
            useremmail="sudeepagrawal1999@gmail.com"
          />
          <DropDownItem
            username="Sudeep Kumar"
            useroccupation="Student"
            useremmail="sudeepagrawal1999@gmail.com"
          />
          <DropDownItem
            username="Sudeep Kumar"
            useroccupation="Student"
            useremmail="sudeepagrawal1999@gmail.com"
          />
          <DropDownItem
            username="Sudeep Kumar"
            useroccupation="Student"
            useremmail="sudeepagrawal1999@gmail.com"
          />
          <DropDownItem
            username="Sudeep Kumar"
            useroccupation="Student"
            useremmail="sudeepagrawal1999@gmail.com"
          />
        </div>
      </div>
      <div className="selectedcardscontainer">
        <SelectedCards />
      </div>
    </div>
  );
}

export default MainContainer;
