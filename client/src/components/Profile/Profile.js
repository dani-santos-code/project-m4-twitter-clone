import React, { useEffect } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../CurrentUserContext";
import Tweet from "../Tweet";
const Header = styled.div`
  width: 100%;
  min-height: 100%;
  position: relative;
  border-left: 1.5px solid #f0f0f5;
  margin-left: 0;
`;
const Banner = styled.img`
  width: 100%;
  z-index: 2;
  position: absolute;
`;

const UserAvatar = styled.img`
  position: absolute;
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
  position: absolute;
  top: 250px;
  right: 20px;
`;
const FeedWrapper = styled.div``;

const TweetImg = styled.img`
  width: 200px;
  height: 200px;
`;
const Feed = styled.div``;
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

  // console.log(currentUser);
  console.log(userFeed);
  console.log(userFeed.tweetIds);
  // console.log(Object.keys(userFeed.tweetsById));
  return (
    <div>
      {userStatus === "ok" ? (
        <>
          <Header>
            <Banner src={`${currentUser.bannerSrc}`} />
            <UserAvatar src={`${currentUser.avatarSrc}`} />
            <FollowingBtn>Follow</FollowingBtn>
          </Header>
          {userFeedStatus === "ok" ? (
            <FeedWrapper>
              {userFeed.tweetIds.map((tweet) => (
                <>
                  {userFeed.tweetsById[tweet].media.length ? (
                    <TweetImg
                      src={`${userFeed.tweetsById[tweet].media[0].url}`}
                    />
                  ) : (
                    ""
                  )}
                  <p>{userFeed.tweetsById[tweet].status}</p>
                </>
              ))}
            </FeedWrapper>
          ) : (
            ""
          )}
        </>
      ) : (
        <h1>{userStatus}</h1>
      )}
    </div>
  );
}
