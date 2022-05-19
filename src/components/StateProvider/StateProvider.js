import React, { createContext, useState } from "react";
export const UserDetailsContext = createContext();
function StateProvider({ children }) {
  const [dropdownDisplay, setdropdownDisplay] = useState("none");
  const [selectedData, setselectedData] = useState([]);
  const changeDropDownDisplay = (newstate) => {
    setdropdownDisplay(newstate);
  };

  const addToSelectedData = (newData) => {
    setselectedData((previousState) => [...previousState, newData]);
  };

  const chageSelectedData = (newdata) => {
    setselectedData(newdata);
  };

  return (
    <UserDetailsContext.Provider
      value={{
        dropdownDisplay,
        changeDropDownDisplay,
        selectedData,
        addToSelectedData,
        chageSelectedData,
      }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
}

export default React.memo(StateProvider);
