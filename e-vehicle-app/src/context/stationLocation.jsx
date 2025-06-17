import React, { createContext, useState } from "react";

export const StationLocationContext = createContext();

export const StationLocationProvider = ({ children }) => {
  const [stationData, setstationData] = useState([]);

  const UpdateStationData = (data) => {
    setstationData(data);
  };

  return (
    <StationLocationContext.Provider value={{ stationData, UpdateStationData }}>
      {children}
    </StationLocationContext.Provider>
  );
};
