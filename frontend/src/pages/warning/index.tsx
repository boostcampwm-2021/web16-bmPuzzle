import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import WarningIcon from "@images/warning-icon.png";

type PropsType = {
  warn: string;
};

type ObjType = {
  [index: string]: string;
  noUser: string;
  noFile: string;
  undefined: string;
};

const textObj: ObjType = {
  noUser: "로그인을 하고 이용해주세요",
  noFile: "해당하는 사진이 없습니다 :(",
  undefined: "게임룸은 정원제한에 도달하였습니다",
};

const Warning = (props: PropsType) => {
  const history = useHistory();
  const goLogin = () => history.push("/");

  return (
    <Wrapper>
      <Container>
        <Img src={WarningIcon} alt="" />
        <span>{textObj[props.warn]}</span>
        {props.warn !== "noFile" && (
          <Btn onClick={goLogin}>처음으로 돌아가기</Btn>
        )}
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
