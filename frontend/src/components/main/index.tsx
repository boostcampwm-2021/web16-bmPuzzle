import React, { useState } from "react";
import styled from "styled-components";
import colors from "@styles/theme";

import Header from "@components/header/index";
import Search from "@components/main/search-bar/index";

const Main = () => {
  const [search, setSearch] = useState("");
  return (
    <Wrapper>
      <Header />
      <Search setSearch={setSearch} />
      <Container>hihello</Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 80%;
  height: 70%;
  margin: 5% 10%;
  border: 1px solid ${colors["gray3"]};
`;

export default Main;
