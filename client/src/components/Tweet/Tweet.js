import React, { useEffect } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../CurrentUserContext";

const TweetUL = styled.ul`
  list-style: none;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;
const TweetAuthor = styled.p`
  font-weight: bold;
`;

const Status = styled.p``;

export default function Tweet() {
  const { feed, feedStatus } = React.useContext(CurrentUserContext);

  return (
    <>
      {feedStatus === "ok" ? (
        feed.tweetIds.map((tweet, i) => {
          console.log(feed);
          return (
            <TweetUL>
              <li key={`${i}-${tweet}`}>
                {feed.tweetsById[tweet].author && (
                  <Avatar src={`${feed.tweetsById[tweet].author.avatarSrc}`} />
                )}
                <TweetAuthor>
                  {feed.tweetsById[tweet].author.displayName}
                </TweetAuthor>
                <Status> {feed.tweetsById[tweet].status}</Status>
              </li>
            </TweetUL>
          );
        })
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
}
