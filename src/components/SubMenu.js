import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
    background: #632ce4;
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
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
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
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return item.subNav ? (
            <>
              <SidebarLink
                to={item.path}
                onClick={item.subNav && showSubnav2}
                style={{ backgroundColor: "#104bb0" }}
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
              </SidebarLink>
              {subnav2 &&
                item.subNav.map((item, index) => {
                  return (
                    <DropdownLink to={item.path} key={index}>
                      {item.icon}
                      <SidebarLabel>{item.title}</SidebarLabel>
                    </DropdownLink>
                  );
                })}
            </>
          ) : (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};

export default SubMenu;
