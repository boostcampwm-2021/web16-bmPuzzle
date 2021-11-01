import React from "react";
import styled from "styled-components";

const HeaderDiv = styled.div``;

const Header: React.FC = () => {
  return (
    <HeaderDiv>
      <div className="header_logo"></div>
      <div className="header__ranking"></div>
      <div className="header__mypage"></div>
    </HeaderDiv>
  );
};

export default Header;
