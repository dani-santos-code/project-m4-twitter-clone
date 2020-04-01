import React from "react";
import { Icon } from "react-icons-kit";
import styled from "styled-components";
import { messageCircle } from "react-icons-kit/feather/messageCircle";
import { repeat } from "react-icons-kit/feather/repeat";
import { heart } from "react-icons-kit/feather/heart";
import { share } from "react-icons-kit/feather/share";

const TweetActionsWrapper = styled.div`
  display: flex;
  margin-left: 36px;
`;
const IconWrapper = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  margin-right: 60px;
`;

export default function TweetActions() {
  return (
    <TweetActionsWrapper>
      <IconWrapper>
        <Icon icon={messageCircle} />
      </IconWrapper>
      <IconWrapper>
        <Icon icon={repeat} />
      </IconWrapper>
      <IconWrapper>
        <Icon icon={heart} />
      </IconWrapper>
      <IconWrapper>
        <Icon icon={share} />
      </IconWrapper>
    </TweetActionsWrapper>
  );
}
