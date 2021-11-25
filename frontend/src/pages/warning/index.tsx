import React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { useLocation } from "react-router";
import styled from "styled-components";
import WarningIcon from "@images/warning-icon.png";

type ObjType = {
  [index: string]: string;
  noUser: string;
  noFile: string;
  isFull: string;
};

const textObj: ObjType = {
  noUser: "로그인을 하고 이용해주세요",
  noFile: "해당하는 사진이 없습니다 :(",
  isFull: "게임룸은 정원제한에 도달하였습니다",
};

interface stateType {
  warn: string;
  prevPath?: string;
}
const Warning = (props: any) => {
  const location = useLocation<stateType>();
  const warningCase: any = location.state.warn;
  const prevPath = warningCase === "noUser" ? location.state.prevPath : "/main";
  return (
    <Wrapper>
      <Container>
        <Img src={WarningIcon} alt="" />
        <span>{textObj[warningCase]}</span>
        {warningCase !== "noFile" && (
          // eslint-disable-next-line no-restricted-globals
          <Link to={{ pathname: "/", state: { prevPath: prevPath } }}>
            처음으로 돌아가기
          </Link>
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

export default Warning;
