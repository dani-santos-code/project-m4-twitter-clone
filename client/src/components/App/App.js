import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../Sidebar";
import HomeFeed from "../HomeFeed";
import Notification from "../Notifications";
import Bookmark from "../Bookmarks";
import TweetDetail from "../Tweet";
import Profile from "../Profile";
import GlobalStyles from "../GlobalStyles";

const Wrapper = styled.div`
  display: grid;
  grid-gap: 40px;
  grid-template-columns: 1fr 2fr;
`;

const App = () => {
  return (
    <Wrapper>
      <GlobalStyles />

      <Router>
        <Sidebar></Sidebar>
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
      </Router>
    </Wrapper>
  );
};

export default App;
