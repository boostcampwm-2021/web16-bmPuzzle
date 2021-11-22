import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import WarningIcon from "@images/warning-icon.png";

const Warning = () => {
  const history = useHistory();

  const goLogin = () => history.push("/");

  return (
    <Wrapper>
      <Container>
        <Img src={WarningIcon} alt="" />
        <span>게임룸은 정원제한에 도달하였습니다!</span>
        <Btn onClick={goLogin}>이전 화면으로 돌아가기</Btn>
      </Container>
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
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 5% 10%;
  font-size: 30px;
  justify-content: center;
  align-items: center;
  & > * {
    margin-bottom: 30px;
  }
`;

const Img = styled.img`
  width: 250px;
  height: 250px;
`;

const Btn = styled.button`
  border-radius: 30px;
  border: none;
  background: black;
  color: white;
  font-size: 15px;
  padding: 1% 2%;
  &: hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

export default Warning;
