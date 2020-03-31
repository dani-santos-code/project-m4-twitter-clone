import React, { useEffect } from "react";

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [status, setStatus] = React.useState("Loading");

  useEffect(() => {
    fetch("http://localhost:31415/api/me/profile")
      .then(res => res.json())
      .then(data => {
        setCurrentUser(data.profile);
        setStatus("ok");
      });
  }, []);
  return (
    <CurrentUserContext.Provider value={{ currentUser, status }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
