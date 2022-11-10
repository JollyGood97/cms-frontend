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

  return (
    <>
      <NavLink
        to={item.path}
        onClick={item.subNav && showSubnav}
        className={({ isActive }) => (isActive ? "activeLinks" : "links")}
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
                className={({ isActive }) =>
                  isActive ? "activeLinks" : "links"
                }
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
                      className={({ isActive }) =>
                        isActive ? "dropdownLinkActive" : "dropdownLink"
                      }
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
              className={({ isActive }) =>
                isActive ? "dropdownLinkActive" : "dropdownLink"
              }
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
