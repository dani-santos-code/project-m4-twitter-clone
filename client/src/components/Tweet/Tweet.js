import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
const TweetBoxInput = styled.textarea`
  width: 300px;
  height: 50px;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-color: grey;
  margin-left: 10px;
  resize: none;
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

const CharacterCount = styled.p`
  color: ${props => props.charColor};
`;

export default function Tweet() {
  const {
    currentUser,
    userStatus,
    feed,
    feedStatus,
    setFeedStatus
  } = React.useContext(CurrentUserContext);

  const [inputText, setInputText] = useState("");

  const [charCount, setCharCount] = useState({ current: 0, maxChar: 280 });
  //   const [charColor, setCharColor] = useState("black");

  const inputEl = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    if (inputText.length <= 280) {
      fetch("/api/tweet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: inputText })
      })
        .then(res => res.json())
        .then(res => {
          if (res) {
            setFeedStatus("Loading");
            //   console.log(res);
          }
        });
    } else {
      setFeedStatus("Loading");
    }
  };

  const handleChange = event => {
    setInputText(event.target.value);
    setCharCount({
      ...charCount,
      current: event.target.value.length
    });
  };

  //   console.log(charCount.maxChar - charCount.current);
  useEffect(() => {
    if (userStatus === "ok" && feedStatus === "ok") {
      inputEl.current.focus();
    }
  }, [userStatus, feedStatus]);

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
          {charCount.maxChar - charCount.current <= 55 &&
          charCount.maxChar - charCount.current >= 0 ? (
            <CharacterCount charColor={"#f0e130"}>
              {charCount.maxChar - charCount.current}
            </CharacterCount>
          ) : charCount.maxChar - charCount.current < 0 ? (
            <CharacterCount charColor={"red"}>
              {charCount.maxChar - charCount.current}
            </CharacterCount>
          ) : (
            <CharacterCount charColor={"black"}>
              {charCount.maxChar - charCount.current}
            </CharacterCount>
          )}

          <MeowCTA type="submit" value={"MEOW"}></MeowCTA>
        </TweetBoxWrapper>
      )}
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
