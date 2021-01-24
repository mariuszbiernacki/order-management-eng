import React from "react";
import bgPhoto from "../../assets/images/gasket.jpg";
import styled from "styled-components";

const HomeWrapper = styled.div`
  background-image: ${({ photo }) => `url(${photo})`};
  height: 100vh;
  width: 100%;
`;

const Home = () => {
  return <HomeWrapper photo={bgPhoto} />;
};

export default Home;
