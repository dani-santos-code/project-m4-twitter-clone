import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Logo from "../App/Logo";

const NavBar = styled.nav`
  margin-right: 70px;
  line-height: 10px;
  font-family: "Varela Round", sans-serif;
  display: flex;
  flex-direction: column;
`;
const StyledLink = styled(NavLink)`
  text-decoration: none;
  margin: 5px;
  color: #4406bd;
  &:hover {
    color: #dc01d4;
  }
  position: relative;
`;
export default function Sidebar() {
  return (
    <NavBar>
      <Logo></Logo>
      <StyledLink to="/" activeClassName="selected" exact>
        Home
      </StyledLink>
      <StyledLink to="/notifications" activeClassName="selected" exact>
        Notifications
      </StyledLink>
      <StyledLink to="/bookmarks" activeClassName="selected" exact>
        Bookmarks
      </StyledLink>
      <StyledLink to="/profile/profileId" activeClassName="selected" exact>
        Profile
      </StyledLink>
    </NavBar>
  );
}
