import React from "react";
import styled from "styled-components";
import logo_image from "@images/puzzle-icon.png";
import ranking_image from "@images/ranking-icon.png";
import account_image from "@images/account-icon.png";

const HeaderDiv = styled.div`
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 70px;
  background: #000000;
  display: flex;
  align-content: center;
`;

const HeaderLogo = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
`;

const HeaderRanking = styled.div`
  position: absolute;
  right: 110px;
`;

const HeaderMyPage = styled.div`
  position: absolute;
  right: 25px;
`;

const HeaderBtn = styled.button`
  padding: 0px;
  margin-top: 9px;
  border: none;
  background: transparent;
  width: 50px;
  height: 50px;
  align-content: center;
  &:hover {
    cursor: pointer;
  }
  & > img {
    width: 50px;
    height: 50px;
  }
`;

const Header = () => {
  return (
    <HeaderDiv>
      <HeaderLogo>
        <HeaderBtn id="logo_btn">
          <img src={logo_image} alt="logo" />
        </HeaderBtn>
      </HeaderLogo>
      <HeaderRanking>
        <HeaderBtn id="ranking_btn">
          <img src={ranking_image} alt="ranking_page" />
        </HeaderBtn>
      </HeaderRanking>
      <HeaderMyPage>
        <HeaderBtn id="mypage_btn">
          <img src={account_image} alt="my_page" />
        </HeaderBtn>
      </HeaderMyPage>
    </HeaderDiv>
  );
};

export default Header;
