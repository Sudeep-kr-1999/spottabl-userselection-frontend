import React, { createContext, useState } from "react";
export const UserDetailsContext = createContext();
function StateProvider({ children }) {
  const [dropdownDisplay, setdropdownDisplay] = useState("none");
  const [selectedData, setselectedData] = useState([]);
  const [addingDeletingCount, setaddingDeletingCount] = useState(0);

  const changeAddingDeletingCount = (newCount) => {
    setaddingDeletingCount(newCount);
  };
  const changeDropDownDisplay = (newstate) => {
    setdropdownDisplay(newstate);
  };
  const addToSelectedData = (newData) => {
    setselectedData((previousState) => [...previousState, newData]);
  };
  const changeSelectedData = (newdata) => {
    setselectedData(newdata);
  };

  return (
    <UserDetailsContext.Provider
      value={{
        dropdownDisplay,
        changeDropDownDisplay,
        selectedData,
        addToSelectedData,
        changeSelectedData,
        addingDeletingCount,
        changeAddingDeletingCount,
      }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
}

export default React.memo(StateProvider);
