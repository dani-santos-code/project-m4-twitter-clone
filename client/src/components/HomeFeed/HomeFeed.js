import React from "react";
import styled from "styled-components";
import TweetFeed from "../Tweet";

const HomeWrapper = styled.div``;
export default function HomeFeed() {
  return (
    <HomeWrapper>
      <h1>Home</h1>
      <TweetFeed />
    </HomeWrapper>
  );
}
