// @ts-nocheck
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { getCurrentUser } from "src/util/Util";
import "../App.css";

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  const [subnav2, setSubnav2] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const showSubnav = () => setSubnav(!subnav);
  const showSubnav2 = () => setSubnav2(!subnav2);

  const showNav = (title) => {
    switch (title) {
      case "Contract Management":
        if (
          currentUser &&
          currentUser.roles.includes("ROLE_CONTRACT_MANAGER")
        ) {
          return true;
        } else {
          if (currentUser && currentUser.roles.includes("ROLE_SUPER_ADMIN")) {
            return true;
          } else {
            return false;
          }
        }
      case "Supply Management":
        if (currentUser && currentUser.roles.includes("ROLE_SUPER_ADMIN")) {
          return true;
        } else {
          return false;
        }
      case "Resource Management":
        if (
          currentUser &&
          (currentUser.roles.includes("ROLE_HR_MANAGER") ||
            currentUser.roles.includes("ROLE_MACHINE_MANAGER"))
        ) {
          return true;
        } else {
          if (currentUser && currentUser.roles.includes("ROLE_SUPER_ADMIN")) {
            return true;
          } else {
            return false;
          }
        }
      default:
        return true;
    }
  };

  return (
    <>
      {showNav(item.title) && (
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
      )}

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
