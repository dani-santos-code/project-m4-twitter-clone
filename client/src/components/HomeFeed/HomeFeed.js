import React from "react";
import { CurrentUserContext } from "../CurrentUserContext";

export default function HomeFeed() {
  const { feed, feedStatus } = React.useContext(CurrentUserContext);
  if (feedStatus === "ok") {
    console.log(feed);
  }
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
