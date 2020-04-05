import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../Sidebar";
import HomeFeed from "../HomeFeed";
import Notification from "../Notifications";
import Bookmark from "../Bookmarks";
import TweetDetail from "../Tweet/TweetDetail";
import Profile from "../Profile";
import ErrorPage from "./ErrorPage";
import GlobalStyles from "../GlobalStyles";

import { CurrentUserContext } from "../CurrentUserContext";
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  margin-right: 100px;
  border-right: 2px solid #f0f0f5;
`;

const App = () => {
  const { error } = useContext(CurrentUserContext);

  return (
    <Wrapper>
      <GlobalStyles />
      <Sidebar></Sidebar>
      {error ? (
        <ErrorPage />
      ) : (
        <Switch>
          <Route exact path="/">
            <HomeFeed />
          </Route>
          <Route exact path="/notifications">
            <Notification />
          </Route>
          <Route exact path="/bookmarks">
            <Bookmark />
          </Route>
          <Route exact path="/tweet/:tweetId">
            <TweetDetail />
          </Route>
          <Route exact path="/:profileId">
            <Profile />
          </Route>
        </Switch>
      )}
    </Wrapper>
  );
};

export default App;
