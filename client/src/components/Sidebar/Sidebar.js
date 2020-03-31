import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { home } from "react-icons-kit/icomoon/home";
import { user } from "react-icons-kit/icomoon/user";
import { bell } from "react-icons-kit/icomoon/bell";
import { bookmark } from "react-icons-kit/icomoon/bookmark";
import { Icon } from "react-icons-kit";
import { COLORS } from "../../constants";

import Logo from "../App/Logo";

const NavBar = styled.nav`
  line-height: 30px;
  font-family: "Varela Round", sans-serif;
  display: flex;
  flex-direction: column;
  .logo {
    padding-bottom: 40px;
  }
`;
const StyledLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  margin: 5px;
  color: black;
  &.selected {
    color: purple;
  }
`;

const MenuItem = styled.div`
  display: block;
  width: 100%;
  padding: 5px;
  &:hover {
    background: ${COLORS.background};
    border-radius: 10px;
    width: 120px;
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
        <StyledLink to="/" activeClassName="selected" exact>
          <StyledIcon icon={home} />
          <span>Home</span>
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to="/notifications" activeClassName="selected" exact>
          <StyledIcon icon={bell} />
          Notifications
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to="/bookmarks" activeClassName="selected" exact>
          <StyledIcon icon={bookmark} />
          Bookmarks
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink to="/abc" activeClassName="selected" exact>
          <StyledIcon icon={user} />
          Profile
        </StyledLink>
      </MenuItem>
    </NavBar>
  );
}
