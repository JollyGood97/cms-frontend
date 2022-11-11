// @ts-nocheck
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import { IconContext } from "react-icons/lib";
import Button from "@mui/material/Button";

const Nav = styled.div`
  background: #040338;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #040338;
  width: 350px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
  transition: 350ms;
  z-index: 10;
  overflow: auto;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);
  let navigate = useNavigate();

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav>
          <Button
            variant="outlined"
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/login");
            }}
            sx={{
              color: "black",
              marginLeft: "90%",
              backgroundColor: "cyan",
              marginRight: "20px",
              width: "160px",
              "&:hover": { backgroundColor: "cyan" },
            }}
          >
            LOG OUT
          </Button>
        </Nav>

        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <div>
              <h1
                style={{
                  color: "white",
                  padding: "25px",
                  backgroundColor: "orangered",
                  textAlign: "center",
                }}
              >
                CMS LOGO
              </h1>
            </div>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
