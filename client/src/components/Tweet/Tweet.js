import React, { useEffect, useRef, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from "date-fns";
import { Icon } from "react-icons-kit";
import { repeat } from "react-icons-kit/feather/repeat";
import { CurrentUserContext } from "../CurrentUserContext";
import TweetActions from "./TweetActions";
import TweetBox from "./TweetBox";

const TweetFeedWrapper = styled.div`
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
  margin-top: 40px;
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
  overflow: hidden;
  text-overflow: ellipsis;
`;
const TweetUserContent = styled.div``;

const TweetMediaImage = styled.img`
  width: 400px;
  height: 250px;
  border-radius: 10px;
`;

const RetweetWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  color: grey;
`;
const StyledIcon = styled(Icon)`
  padding-right: 5px;
`;

const ActionsWrapper = styled.div`
  margin: 10px 0;
  width: 300px;
`;

const Divider = styled.div`
  border-top: 1.5px solid #e5e5e5;
  width: 420px;
  margin-bottom: 10px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export default function Tweet() {
  const {
    currentUser,
    userStatus,
    feed,
    feedStatus,
    setFeedStatus,
  } = React.useContext(CurrentUserContext);

  return (
    <>
      <TweetBox />
      <TweetFeedWrapper>
        {userStatus === "ok" && feedStatus === "ok" ? (
          feed.tweetIds.map((tweet, i) => {
            return (
              <React.Fragment key={`${i}-${tweet}`}>
                <div>
                  <Avatar src={`${feed.tweetsById[tweet].author.avatarSrc}`} />
                </div>
                <div>
                  <StyledLink
                    tabIndex={-1}
                    to={`/tweet/${feed.tweetsById[tweet].id}`}
                  >
                    <TweetUserInfo>
                      {feed.tweetsById[tweet].retweetFrom && (
                        <RetweetWrapper>
                          <StyledIcon icon={repeat} />
                          <p>
                            {feed.tweetsById[tweet].retweetFrom.displayName}
                          </p>
                        </RetweetWrapper>
                      )}
                      {/* {console.log(feed)} */}
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
                      {/* {console.log(feed.tweetsById[tweet])} */}
                      {feed.tweetsById[tweet].status && (
                        <Status> {feed.tweetsById[tweet].status}</Status>
                      )}
                      {feed.tweetsById[tweet].media.length ? (
                        <TweetMediaImage
                          src={`${feed.tweetsById[tweet].media[0].url}`}
                        ></TweetMediaImage>
                      ) : (
                        ""
                      )}
                      <ActionsWrapper>
                        <TweetActions />
                      </ActionsWrapper>
                    </TweetUserContent>
                  </StyledLink>
                  <Divider />
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <h1>Loading</h1>
        )}
      </TweetFeedWrapper>
    </>
  );
}
