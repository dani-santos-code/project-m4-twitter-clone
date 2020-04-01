import React, { useEffect } from "react";
import styled from "styled-components";
import { format } from "date-fns";

import { CurrentUserContext } from "../CurrentUserContext";

const TweetWrapper = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 60px 2fr;
`;

const TweetUserInfo = styled.ul`
  list-style: none;
`;

const TweetListItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: top;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;
const TweetAuthor = styled.p`
  font-weight: bold;
`;

const TweetHandle = styled.p`
  color: grey;
  margin-left: 5px;
`;
const BulletDivider = styled.span`
  width: 4px;
  height: 4px;
  margin-left: 5px;
  align-self: center;
  border-radius: 50%;
  background: #8c8a8abd;
`;
const TimeStamp = styled.p`
  color: grey;
  margin-left: 5px;
`;
const Status = styled.p`
  margin: 10px 0;
  width: 400px;
`;

const TweetUserContent = styled.div``;

const TweetMediaImage = styled.img`
  width: 400px;
  height: 250px;
  border-radius: 10px;
`;

const ActionsWrapper = styled.div``;

export default function Tweet() {
  const { feed, feedStatus } = React.useContext(CurrentUserContext);

  return (
    <TweetWrapper>
      {feedStatus === "ok" ? (
        feed.tweetIds.map((tweet, i) => {
          return (
            <>
              <div>
                <Avatar src={`${feed.tweetsById[tweet].author.avatarSrc}`} />
              </div>
              <div>
                <TweetUserInfo>
                  {console.log(feed)}
                  {feed.tweetsById[tweet].author && (
                    <TweetListItem key={`${i}-${tweet}`}>
                      <TweetAuthor>
                        {feed.tweetsById[tweet].author.displayName}
                      </TweetAuthor>
                      <TweetHandle>
                        @{feed.tweetsById[tweet].author.handle}
                      </TweetHandle>
                      <BulletDivider></BulletDivider>
                      <TimeStamp>
                        {format(
                          new Date(feed.tweetsById[tweet].timestamp),
                          "MMM do"
                        )}
                      </TimeStamp>
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
                  <ActionsWrapper></ActionsWrapper>
                </TweetUserContent>
              </div>
            </>
          );
        })
      ) : (
        <h1>Loading</h1>
      )}
    </TweetWrapper>
  );
}
