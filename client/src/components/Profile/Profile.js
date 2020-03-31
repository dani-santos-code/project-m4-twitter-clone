import React from "react";
import { CurrentUserContext } from "../CurrentUserContext";

export default function Profile() {
  const { currentUser, status } = React.useContext(CurrentUserContext);

  return (
    <div>
      {status === "ok" ? (
        <h1>Welcome, {currentUser.displayName}</h1>
      ) : (
        <h1>{status}</h1>
      )}
    </div>
  );
}
