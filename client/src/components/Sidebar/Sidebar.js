import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { home } from "react-icons-kit/feather/home";
import { user } from "react-icons-kit/feather/user";
import { bell } from "react-icons-kit/feather/bell";
import { bookmark } from "react-icons-kit/feather/bookmark";
import { Icon } from "react-icons-kit";
import { COLORS } from "../../constants";

import Logo from "../App/Logo";

const NavBar = styled.nav`
  line-height: 30px;
  padding: 20px;
  font-family: "Varela Round", sans-serif;
  border-right: 2px solid #f0f0f5;
  display: flex;
  flex-direction: column;
  .logo {
    margin-bottom: 30px;
  }
`;
const StyledLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  margin: 5px;
  color: black;
  &.selected {
    color: #4c00ff;
    font-weight: bold;
  }
  &:hover {
    color: #4c00ff;
    font-weight: bold;
  }
`;

const MenuItem = styled.div`
  display: block;
  width: 100%;
  padding: 5px;
  &:hover {
    background: ${COLORS.background};
    border-radius: 30px;
    width: auto;
  }
`;

const StyledIcon = styled(Icon)`
  padding-right: 5px;
`;
export default function Sidebar() {
  return (
    <NavBar>
      <Logo></Logo>
      <MenuItem>
        <StyledLink tabIndex={1} to="/" activeClassName="selected" exact>
          <StyledIcon icon={home} />
          <span>Home</span>
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink
          tabIndex={2}
          to="/notifications"
          activeClassName="selected"
          exact
        >
          <StyledIcon icon={bell} />
          Notifications
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink
          tabIndex={3}
          to="/bookmarks"
          activeClassName="selected"
          exact
        >
          <StyledIcon icon={bookmark} />
          Bookmarks
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink tabIndex={4} to="/abc" activeClassName="selected" exact>
          <StyledIcon icon={user} />
          Profile
        </StyledLink>
      </MenuItem>
    </NavBar>
  );
}
