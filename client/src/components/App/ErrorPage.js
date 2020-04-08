import React from "react";
import { u1F4A3 as bomb } from "react-icons-kit/noto_emoji_regular/u1F4A3";
import { Icon } from "react-icons-kit";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const ErrorText = styled.p`
  margin-top: 40px;
  font-size: 25px;
  font-weight: bold;
`;

export default function NotFound() {
  return (
    <Wrapper>
      <Icon icon={bomb} size={80} />
      <ErrorText>An unknown error has occurred</ErrorText>
    </Wrapper>
  );
}
