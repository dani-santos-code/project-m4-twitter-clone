import React, { useEffect } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../CurrentUserContext";
import Tweet from "../Tweet/Tweet";
import Spinner from "../App/Spinner";

const Header = styled.div`
  width: 100%;
  min-height: 100%;
  position: relative;
  margin-left: 0;
`;
const Banner = styled.img`
  width: 100%;
  z-index: 2;
`;

const UserAvatar = styled.img`
  top: 200px;
  left: 20px;
  z-index: 10;
  border: 3px solid white;
  border-radius: 50%;
  width: 80px;
  height: 80px;
`;

const FollowingBtn = styled.button`
  background: hsl(258deg, 100%, 50%);
  color: white;
  width: 100px;
  border-radius: 35px;
  height: 30px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
`;
const FeedWrapper = styled.div``;

const AvatarButton = styled.div`
  margin-top: -50px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 10px;
`;

export default function Profile() {
  const { currentUser, userStatus } = React.useContext(CurrentUserContext);
  const [userFeed, setUserFeed] = React.useState("");
  const [userFeedStatus, setUserFeedStatus] = React.useState("Loading");

  useEffect(() => {
    if (userStatus === "ok") {
      fetch(`api/${currentUser.handle}/feed`)
        .then((res) => res.json())
        .then((tweets) => {
          setUserFeed(tweets);
          setUserFeedStatus("ok");
        });
    }
  }, [userStatus]);

  return (
    <div>
      {userStatus === "ok" ? (
        <>
          <Header>
            <Banner src={`${currentUser.bannerSrc}`} />
            <AvatarButton>
              <UserAvatar src={`${currentUser.avatarSrc}`} />
              <FollowingBtn>Follow</FollowingBtn>
            </AvatarButton>
          </Header>
          {userFeedStatus === "ok" ? (
            <FeedWrapper>
              {userFeed.tweetIds.map((tweetId) => (
                <Tweet
                  key={tweetId}
                  tweet={userFeed.tweetsById[tweetId]}
                  author={userFeed.tweetsById[tweetId].author}
                />
              ))}
            </FeedWrapper>
          ) : (
            ""
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
