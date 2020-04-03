import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { format } from "date-fns";
import TweetActions from "../components/Tweet/TweetActions";

const Avatar = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  padding-right: 5px;
`;

const TweetAuthor = styled.p`
  font-weight: bold;
`;

const TweetUserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
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
  margin: 10px 50px;
  width: 400px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const TweetUserContent = styled.div``;

const TweetMediaImage = styled.img`
  width: 400px;
  height: 250px;
  border-radius: 10px;
  margin-left: 50px;
`;

const ActionsWrapper = styled.div`
  margin-left: 60px;
`;
export default function TweetDetail() {
  const { tweetId } = useParams();
  const [tweetData, setTweetData] = useState("");
  const [status, setStatus] = useState("Loading");

  useEffect(() => {
    fetch(`/api/tweet/${tweetId}`)
      .then(res => res.json())
      .then(res => {
        setTweetData(res);
        setStatus("ok");
      });
  }, []);

  return (
    <div>
      {status === "ok" ? (
        <>
          <TweetUserInfo>
            <Avatar src={`${tweetData.tweet.author.avatarSrc}`} />
            <TweetAuthor>{tweetData.tweet.author.displayName}</TweetAuthor>
            <TweetHandle>@{tweetData.tweet.author.handle}</TweetHandle>
            <BulletDivider></BulletDivider>
            <TimeStamp>
              {format(new Date(tweetData.tweet.timestamp), "MMM do")}
            </TimeStamp>
          </TweetUserInfo>
          <TweetUserContent>
            <Status>{tweetData.tweet.status}</Status>
            {tweetData.tweet.media.length ? (
              <TweetMediaImage
                src={`${tweetData.tweet.media[0].url}`}
              ></TweetMediaImage>
            ) : (
              ""
            )}
          </TweetUserContent>
          <ActionsWrapper>
            <TweetActions />
          </ActionsWrapper>
        </>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}
