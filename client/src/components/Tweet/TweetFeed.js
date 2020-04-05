import React, { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "date-fns";
import { Icon } from "react-icons-kit";
import { repeat } from "react-icons-kit/feather/repeat";
import { CurrentUserContext } from "../CurrentUserContext";
import NewTweet from "./NewTweet";
import Tweet from "./Tweet";

const TweetFeedWrapper = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 60px 2fr;
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
