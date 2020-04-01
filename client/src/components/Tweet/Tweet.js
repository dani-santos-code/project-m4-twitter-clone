import React, { useEffect } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../CurrentUserContext";

const TweetWrapper = styled.div``;

const TweetUserInfo = styled.ul`
  list-style: none;
`;

const TweetListItem = styled.li``;

const Avatar = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;
const TweetAuthor = styled.p`
  font-weight: bold;
`;

const Status = styled.p`
  /* position: absolute; */
`;

const TweetUserContent = styled.div`
  /* position: relative; */
`;

const TweetMediaImage = styled.img`
  /* position: absolute; */
  width: 500px;
  height: 350px;
  border-radius: 20px;
`;

export default function Tweet() {
  const { feed, feedStatus } = React.useContext(CurrentUserContext);

  return (
    <TweetWrapper>
      {feedStatus === "ok" ? (
        feed.tweetIds.map((tweet, i) => {
          return (
            <>
              <TweetUserInfo>
                {console.log(feed)}
                {feed.tweetsById[tweet].author && (
                  <TweetListItem key={`${i}-${tweet}`}>
                    <Avatar
                      src={`${feed.tweetsById[tweet].author.avatarSrc}`}
                    />
                    <TweetAuthor>
                      {feed.tweetsById[tweet].author.displayName}
                    </TweetAuthor>
                  </TweetListItem>
                )}
              </TweetUserInfo>
              <TweetUserContent>
                <Status> {feed.tweetsById[tweet].status}</Status>
                {feed.tweetsById[tweet].media.length && (
                  <TweetMediaImage
                    src={`${feed.tweetsById[tweet].media[0].url}`}
                  ></TweetMediaImage>
                )}
              </TweetUserContent>
            </>
          );
        })
      ) : (
        <h1>Loading</h1>
      )}
    </TweetWrapper>
  );
}
