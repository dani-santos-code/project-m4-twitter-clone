import React from "react";
import { CurrentUserContext } from "../CurrentUserContext";

export default function Profile() {
  const { currentUser, userStatus } = React.useContext(CurrentUserContext);

  return (
    <div>
      {userStatus === "ok" ? (
        <h1>Welcome, {currentUser.displayName}</h1>
      ) : (
        <h1>{userStatus}</h1>
      )}
    </div>
  );
}
