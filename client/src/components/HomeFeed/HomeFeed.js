import React from "react";
import styled from "styled-components";
import { CurrentUserContext } from "../CurrentUserContext";
import Tweet from "../Tweet";
export default function HomeFeed() {
  return (
    <div>
      <h1>Home</h1>
      <Tweet />
    </div>
  );
}
