// @ts-nocheck
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import "../App.css";

const SidebarLink = styled(Link)`
  display: flex;
  color: #e1e9fc;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #000000;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #ffffff;
  font-size: 18px;

  &:hover {
    background: #313238;
    cursor: pointer;
  }
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const [subnav2, setSubnav2] = useState(false);

  const showSubnav = () => setSubnav(!subnav);
  const showSubnav2 = () => setSubnav2(!subnav2);

  const http = "";
  console.log(item.path);
  console.log(window.location.href);
  return (
    <>
      <NavLink
        to={item.path}
        onClick={item.subNav && showSubnav}
        activeClassName="activeLinks"
        className="links"
      >
        <div>
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </NavLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return item.subNav ? (
            <>
              <NavLink
                to={item.path}
                activeClassName="activeLinks"
                className="links"
                onClick={item.subNav && showSubnav2}
                style={{
                  backgroundColor: "#000000",
                }}
              >
                <div>
                  {item.icon}
                  <SidebarLabel>{item.title}</SidebarLabel>
                </div>
                <div>
                  {item.subNav && subnav2
                    ? item.iconOpened
                    : item.subNav
                    ? item.iconClosed
                    : null}
                </div>
              </NavLink>
              {subnav2 &&
                item.subNav.map((item, index) => {
                  return (
                    <NavLink
                      activeClassName="dropdownLinkActive"
                      className="dropdownLink"
                      to={item.path}
                      key={index}
                    >
                      {item.icon}
                      <SidebarLabel>{item.title}</SidebarLabel>
                    </NavLink>
                  );
                })}
            </>
          ) : (
            <NavLink
              activeClassName="dropdownLinkActive"
              className="dropdownLink"
              to={item.path}
              key={index}
            >
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </NavLink>
          );
        })}
    </>
  );
};

export default SubMenu;
