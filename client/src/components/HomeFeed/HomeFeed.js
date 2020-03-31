import React from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../CurrentUserContext";

export default function HomeFeed() {
  const { feed, feedStatus } = React.useContext(CurrentUserContext);
  const TweetUL = styled.ul`
    list-style: none;
  `;
  return (
    <div>
      <h1>Home</h1>
      {console.log(feed)}
      {feedStatus === "ok" ? (
        feed.tweetIds.map((tweet, i) => {
          return (
            <TweetUL>
              <li key={`${i}-${tweet}`}>{feed.tweetsById[tweet].status}</li>
            </TweetUL>
          );
        })
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}
