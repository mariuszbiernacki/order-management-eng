import React from "react";
import Navbar from "../navigations/Navbar/Navbar";
import styled from "styled-components";

const MainTemplateWrapper = styled.div`
  background-color: #d42afa;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainTemplate = ({ children }) => {
  return (
    <>
      <Navbar />
      <MainTemplateWrapper>{children}</MainTemplateWrapper>
    </>
  );
};

export default MainTemplate;
