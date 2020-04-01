import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { Icon } from "react-icons-kit";
import { repeat } from "react-icons-kit/feather/repeat";
import { CurrentUserContext } from "../CurrentUserContext";
import TweetActions from "./TweetActions";

const TweetBoxWrapper = styled.form`
  margin-top: 40px;
  border-bottom: 10px solid #00000017;
  width: 500px;
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const TweetBoxHeader = styled.div`
  display: flex;
`;
const TweetBoxInput = styled.input`
  width: 300px;
  height: 50px;
  margin-left: 10px;
  border: none;
  outline: none;
  font-size: 16px;
`;

const UserAvatar = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const MeowCTA = styled.input`
  background: hsl(258deg, 100%, 50%);
  color: white;
  width: 100px;
  border-radius: 35px;
  height: 30px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
  align-self: flex-end;
`;
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
export default function Tweet() {
  const { currentUser, userStatus, feed, feedStatus } = React.useContext(
    CurrentUserContext
  );
  const [inputText, setInputText] = useState("");

  const inputEl = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    const status = inputText;
    // TODO
    // Make post request to API
    // Consult the API to see what requirements exist for posting
  };
  const handleChange = event => {
    setInputText(event.target.value);
  };
  useEffect(() => {
    if (userStatus === "ok" && feedStatus === "ok") {
      inputEl.current.focus();
    }
  }, [userStatus]);

  return (
    <>
      {userStatus === "ok" && feedStatus === "ok" && (
        <TweetBoxWrapper onSubmit={handleSubmit}>
          {/* {console.log(currentUser)} */}
          <TweetBoxHeader>
            <UserAvatar src={currentUser.avatarSrc} />
            <TweetBoxInput
              ref={inputEl}
              placeholder={"What's happening?"}
              onChange={handleChange}
            ></TweetBoxInput>
          </TweetBoxHeader>
          <MeowCTA type="submit" value={"MEOW"}></MeowCTA>
        </TweetBoxWrapper>
      )}
      <TweetFeedWrapper>
        {userStatus === "ok" && feedStatus === "ok" ? (
          feed.tweetIds.map((tweet, i) => {
            return (
              <>
                <div>
                  <Avatar src={`${feed.tweetsById[tweet].author.avatarSrc}`} />
                </div>
                <div>
                  <TweetUserInfo>
                    {feed.tweetsById[tweet].retweetFrom && (
                      <RetweetWrapper>
                        <StyledIcon icon={repeat} />
                        <p>{feed.tweetsById[tweet].retweetFrom.displayName}</p>
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
                    <Status> {feed.tweetsById[tweet].status}</Status>
                    {feed.tweetsById[tweet].media.length && (
                      <TweetMediaImage
                        src={`${feed.tweetsById[tweet].media[0].url}`}
                      ></TweetMediaImage>
                    )}
                    <ActionsWrapper>
                      <TweetActions />
                    </ActionsWrapper>
                  </TweetUserContent>
                  <Divider />
                </div>
              </>
            );
          })
        ) : (
          <h1>Loading</h1>
        )}
      </TweetFeedWrapper>
    </>
  );
}
