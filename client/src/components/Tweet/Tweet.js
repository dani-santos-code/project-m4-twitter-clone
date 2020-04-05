import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { Icon } from "react-icons-kit";
import { repeat } from "react-icons-kit/feather/repeat";
import { Link } from "react-router-dom";

import TweetActions from "./TweetActions";

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

export default function Tweet({ author, tweet }) {
  return (
    <React.Fragment>
      <div>
        <Avatar src={`${author.avatarSrc}`} />
      </div>
      <div>
        <StyledLink tabIndex={-1} to={`/tweet/${tweet.id}`}>
          <TweetUserInfo>
            {tweet.retweetFrom && (
              <RetweetWrapper>
                <StyledIcon icon={repeat} />
                <p>{tweet.retweetFrom.displayName}</p>
              </RetweetWrapper>
            )}
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
              <TweetMediaImage src={`${tweet.media[0].url}`}></TweetMediaImage>
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
}
