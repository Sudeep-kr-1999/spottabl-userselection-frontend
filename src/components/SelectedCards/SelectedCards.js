import React, { useCallback, useContext } from "react";
import "./selectedcards.css";
import Avatar from "@mui/material/Avatar";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserDetailsContext } from "../StateProvider/StateProvider";
function SelectedCards({ id, username, useroccupation }) {
  const { addingDeletingCount, changeAddingDeletingCount } =
    useContext(UserDetailsContext);
  const stringAvatar = useCallback((userName) => {
    return {
      children: `${userName.split(" ")[0][0]}${userName.split(" ")[1][0]}`,
    };
  }, []);

  const deleteSelectedItem = useCallback(
    (event) => {
      let localStoragedata = JSON.parse(localStorage.getItem("displayData"));
      let newdisplayArray = localStoragedata.filter(
        ({ id }) => id != event.currentTarget.id
      );
      localStorage.setItem("displayData", JSON.stringify(newdisplayArray));
      changeAddingDeletingCount(addingDeletingCount - 1);
    },
    [changeAddingDeletingCount, addingDeletingCount]
  );

  return (
    <div className="selected-cards-container">
      <div className="selected-cards-item">
        <div className="user-details-cards">
          <span className="avatar-cards">
            <Avatar
              className="avatar-mui"
              {...stringAvatar(username)}
              sx={{
                color: "black",
                height: "60px",
                width: "60px",
                backgroundColor: "#d8dcfc",
              }}
              style={{ fontWeight: "bold" }}
            />
          </span>
          <div className="userdescription-cards">
            <span className="username-cards">{username}</span>
            <span className="useroccupation-cards">{useroccupation}</span>
          </div>
        </div>
        <span className="deleteicon" id={`${id}`} onClick={deleteSelectedItem}>
          <DeleteIcon
            style={{ color: "darkblue", height: "35px", width: "35px" }}
          />
        </span>
      </div>
    </div>
  );
}

export default SelectedCards;
