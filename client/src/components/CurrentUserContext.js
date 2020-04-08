import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

export const CurrentUserContext = React.createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [userStatus, setUserStatus] = React.useState("Loading");
  const [feed, setFeed] = React.useState();
  const [feedStatus, setFeedStatus] = React.useState("Loading");
  const [error, setError] = React.useState(false);

  useEffect(() => {
    fetch("/api/me/profile")
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data.profile);
        setUserStatus("ok");
      })
      .catch((e) => {
        setError(true);
      });
  }, []);

  useEffect(() => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        setFeed(data);
        setFeedStatus("ok");
      })
      .catch((e) => {
        setError(true);
      });
  }, [feedStatus]);
  return (
    <>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          userStatus,
          feed,
          feedStatus,
          setFeedStatus,
          error,
        }}
      >
        {children}
      </CurrentUserContext.Provider>
    </>
  );
};
