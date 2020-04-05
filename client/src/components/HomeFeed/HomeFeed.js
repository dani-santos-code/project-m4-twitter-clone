import React from "react";
import styled from "styled-components";
import Tweet from "../Tweet";

const HomeWrapper = styled.div`
  padding-left: 30px;
  border-left: 1.5px solid #f0f0f5;
`;
export default function HomeFeed() {
  return (
    <HomeWrapper>
      <h1>Home</h1>
      <Tweet />
    </HomeWrapper>
  );
}
