import React, { useCallback } from "react";
import "./selectedcards.css";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
function SelectedCards({ username, useroccupation }) {
  const stringAvatar = useCallback((userName) => {
    return {
      children: `${userName.split(" ")[0][0]}${userName.split(" ")[1][0]}`,
    };
  }, []);
  return (
    <div className="selected-cards-container">
      <div className="selected-cards-item">
        <div className="user-details-cards">
          <span className="avatar-cards">
            <Avatar
              {...stringAvatar(username)}
              sx={{
                color: "black",
                height: "60px",
                width: "60px",
              }}
              style={{ fontWeight: "bold" }}
            />
          </span>
          <div className="userdescription-cards">
            <span className="username-cards">{username}</span>
            <span className="useroccupation-cards">{useroccupation}</span>
          </div>
        </div>
        <span className="deleteicon">
          <DeleteIcon style={{ color: "darkblue",height:"35px",width:"35px" }} />
        </span>
      </div>
    </div>
  );
}

export default SelectedCards;
