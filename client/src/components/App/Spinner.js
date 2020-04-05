import React from "react";
import { spinner3 } from "react-icons-kit/icomoon/spinner3";
import { Icon } from "react-icons-kit";
import styled, { keyframes } from "styled-components";

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const spin = keyframes`
  0% {
    transform: rotate(0)
  }
  100% {
    transform: rotate(360deg)
  }
`;
const AnimatedIcon = styled.div`
  animation: ${spin} 1.75s linear infinite;
  display: inline-block;
`;

export default function Spinner() {
  return (
    <SpinnerWrapper>
      <AnimatedIcon>
        <Icon icon={spinner3} size={40} />
      </AnimatedIcon>
    </SpinnerWrapper>
  );
}
