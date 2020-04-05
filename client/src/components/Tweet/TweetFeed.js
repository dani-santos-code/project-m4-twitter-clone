import React, { useEffect, useRef, useState, useMemo } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../CurrentUserContext";
import NewTweet from "./NewTweet";
import Tweet from "./Tweet";

const TweetFeedWrapper = styled.div`
  margin-top: 20px;
`;

export default function TweetFeed() {
  const { userStatus, feed, feedStatus } = React.useContext(CurrentUserContext);

  return (
    <>
      <NewTweet />
      <TweetFeedWrapper>
        {userStatus === "ok" && feedStatus === "ok" ? (
          feed.tweetIds.map((tweet) => {
            return (
              <Tweet
                key={`${feed.tweetsById[tweet].id}`}
                author={feed.tweetsById[tweet].author}
                tweet={feed.tweetsById[tweet]}
              />
            );
          })
        ) : (
          <h1>Loading</h1>
        )}
      </TweetFeedWrapper>
    </>
  );
}
