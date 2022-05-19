import React, { useCallback, useContext } from "react";
import "./dropdownitem.css";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import CircleIcon from "@mui/icons-material/Circle";
import demoData from "../demodata.json";
import { UserDetailsContext } from "../StateProvider/StateProvider";
function DropDownItem({ id, username, useroccupation, useremmail }) {
  const { changeDropDownDisplay, addToSelectedData } =
    useContext(UserDetailsContext);
  const stringAvatar = useCallback((userName) => {
    return {
      children: `${userName.split(" ")[0][0]}${userName.split(" ")[1][0]}`,
    };
  }, []);

  const setSearchedChips = useCallback((event) => {
    changeDropDownDisplay("none");
    let chipData = demoData.filter(({ id }) => event.currentTarget.id == id);
    addToSelectedData(chipData[0]);
  }, []);
  return (
    <div className="dropdownparent" id={`${id}`} onClick={setSearchedChips}>
      <div className="drop-down-item">
        <span className="avatar">
          <Avatar
            {...stringAvatar(username)}
            sx={{
              color: "black",
              backgroundColor:"#d8dcfc",
              height: "60px",
              width: "60px",
            }}
            style={{ fontWeight: "bold" }}
          />
        </span>
        <div className="userdetails">
          <span className="username">{username}</span>
          <div className="userdescription">
            <span className="userlogo">
              <PersonIcon
                style={{ height: "20px", width: "20px", color: "grey" }}
              />
            </span>
            <span className="useroccupation">{useroccupation}</span>
            <span className="emaillogo">
              <CircleIcon
                style={{ height: "10px", width: "10px", color: "grey" }}
              />
            </span>
            <span className="useremail">{useremmail}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropDownItem;
