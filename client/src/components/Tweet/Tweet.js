import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { Icon } from "react-icons-kit";
import { repeat } from "react-icons-kit/feather/repeat";
import { Link } from "react-router-dom";

import TweetActions from "./TweetActions";

const TweetWrapper = styled.div`
  border-bottom: 1.5px solid #e5e5e5;
  /* display: grid;
  grid-template-columns: 60px 2fr; */
  padding: 10px;
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
  overflow: hidden;
  text-overflow: ellipsis;
`;
const TweetUserContent = styled.div``;

const TweetMediaImage = styled.img`
  max-width: 100%;
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
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: grid;
  grid-template-columns: 60px 2fr;
`;

export default function Tweet({ author, tweet }) {
  return (
    <TweetWrapper>
      <div>
        {tweet.retweetFrom && (
          <RetweetWrapper>
            <StyledIcon icon={repeat} />
            <p>{tweet.retweetFrom.displayName}</p>
          </RetweetWrapper>
        )}
        <StyledLink tabIndex={-1} to={`/tweet/${tweet.id}`}>
          <Avatar src={`${author.avatarSrc}`} />
          <div tabIndex={0}>
            <TweetUserInfo>
              {/* {console.log(feed)} */}
              {author && (
                <TweetListItem>
                  <TweetAuthor>{author.displayName}</TweetAuthor>
                  <TweetHandle>@{author.handle}</TweetHandle>
                  <BulletDivider></BulletDivider>
                  <TimeStamp>
                    {format(new Date(tweet.timestamp), "MMM do")}
                  </TimeStamp>
                </TweetListItem>
              )}
            </TweetUserInfo>
            <TweetUserContent>
              {/* {console.log(tweet)} */}
              {tweet.status && <Status> {tweet.status}</Status>}
              {tweet.media.length ? (
                <TweetMediaImage
                  src={`${tweet.media[0].url}`}
                ></TweetMediaImage>
              ) : (
                ""
              )}
            </TweetUserContent>
          </div>
        </StyledLink>
        <ActionsWrapper>
          <TweetActions />
        </ActionsWrapper>
      </div>
    </TweetWrapper>
  );
}
