import React, { createContext, useState } from "react";

export const UserLocationContext = createContext();


export const UserLocationProvider = ({ children }) => {
  const [location, setLocation] = useState({ longitude: null, latitude: null });

  const setLocationData = (coords) => {
    setLocation({ longitude: coords.longitude, latitude: coords.latitude });
  };

  return (
    <UserLocationContext.Provider value={{ location, setLocationData }}>
      {children}
    </UserLocationContext.Provider>
  );
};
