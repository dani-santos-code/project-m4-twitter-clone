import React, { useContext, useState, useRef, useEffect, useMemo } from "react";
import styled from "styled-components";

import { CurrentUserContext } from "../CurrentUserContext";

const TweetBoxWrapper = styled.form`
  margin-top: 40px;
  border-bottom: 10px solid #00000017;
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

const CharacterCount = styled.p`
  color: ${(props) => props.charColor};
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

export default function TweetBox() {
  const { userStatus, feedStatus, currentUser, setFeedStatus } = useContext(
    CurrentUserContext
  );
  const [inputText, setInputText] = useState("");
  const [charCount, setCharCount] = useState({ current: 0, maxChar: 280 });

  const inputEl = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.length <= 280) {
      fetch("/api/tweet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: inputText }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            setFeedStatus("Loading");
            //   console.log(res);
          }
        });
    } else {
      setFeedStatus("Loading");
    }
  };
  const handleChange = (event) => {
    setInputText(event.target.value);
    setCharCount({
      ...charCount,
      current: event.target.value.length,
    });
  };

  //   console.log(charCount.maxChar - charCount.current);
  useEffect(() => {
    if (userStatus === "ok" && feedStatus === "ok") {
      inputEl.current.focus();
    }
  }, [userStatus, feedStatus]);

  const isDisabled = useMemo(() => {
    if (inputText.length <= 280) {
      return false;
    }
    return true;
  }, [inputText]);

  return (
    <div>
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

          <MeowCTA type="submit" value={"MEOW"} disabled={isDisabled}></MeowCTA>
        </TweetBoxWrapper>
      )}
    </div>
  );
}
