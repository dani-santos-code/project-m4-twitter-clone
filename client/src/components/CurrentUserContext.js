import React, { useEffect } from "react";

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [userStatus, setUserStatus] = React.useState("Loading");
  const [feed, setFeed] = React.useState();
  const [feedStatus, setFeedStatus] = React.useState("Loading");

  useEffect(() => {
    fetch("/api/me/profile")
      .then(res => res.json())
      .then(data => {
        setCurrentUser(data.profile);
        setUserStatus("ok");
      });
  }, []);

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then(res => res.json())
      .then(data => {
        setFeed(data);
        setFeedStatus("ok");
      });
  }, [feedStatus]);
  return (
    <CurrentUserContext.Provider
      value={{ currentUser, userStatus, feed, feedStatus, setFeedStatus }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
