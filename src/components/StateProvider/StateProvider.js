import React, { createContext, useState } from "react";
export const UserDetailsContext = createContext();
function StateProvider({ children }) {
  const [dropdownDisplay, setdropdownDisplay] = useState("none");
  const [selectedData, setselectedData] = useState([]);
  const changeDropDownDisplay = (newstate) => {
    setdropdownDisplay(newstate);
  };

  const changeSelectedData = (newData) => {
    setselectedData((previousState) => [...previousState, newData]);
  };

  return (
    <UserDetailsContext.Provider
      value={{
        dropdownDisplay,
        changeDropDownDisplay,
        selectedData,
        changeSelectedData,
      }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
}

export default React.memo(StateProvider);
