import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import logo_image from "@images/puzzle-icon.png";
import ranking_image from "@images/ranking-icon.png";
import account_image from "@images/account-icon.png";

const Header = () => {
  const history = useHistory();

  const handleMove = (e: any) => {
    const url =
      e.target.id === "" ? e.target.closest("button").id : e.target.id;
    history.push(`/${url}`);
  };

  return (
    <Wrapper>
      <HomeBtnWrapper>
        <Btn id="main" onClick={handleMove}>
          <Img src={logo_image} alt="logo" />
        </Btn>
      </HomeBtnWrapper>
      <RightIconWrapper>
        <Btn id="ranking" onClick={handleMove}>
          <Img src={ranking_image} alt="ranking_page" />
        </Btn>
        <Btn id="mypage" onClick={handleMove}>
          <Img src={account_image} alt="my_page" />
        </Btn>
      </RightIconWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 30px;
  padding-top: 5px;
  background: #000000;
  display: flex;
  justify-content: space-even;
`;

const HomeBtnWrapper = styled.div`
  width: 50%;
  text-align: right;
`;

const RightIconWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
  & > button {
    margin-left: 5px;
  }
`;

const Btn = styled.button`
  padding: 0px;
  width: 50%;
  border: none;
  background: transparent;
  width: 30px;
  height: 30px;
  align-content: center;
  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  width: 20px;
  height: 20px;
`;

export default Header;
