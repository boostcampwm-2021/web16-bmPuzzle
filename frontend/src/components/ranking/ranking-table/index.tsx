import React from "react";
import styled from "styled-components";

import Line from "@components/ranking/ranking-line/index";

type TypeProps = {
  rankInfo: Array<Object>;
  userRank: any;
};

const RankingTable = (props: TypeProps) => {
  return (
    <Wrapper>
      <HeadLine>
        <span>순위</span>
        <span>아이디</span>
        <span>완성</span>
      </HeadLine>
      <Content>
        {props.rankInfo.map((ele: any, idx: number) => {
          const background = idx === props.userRank.num ? "gray" : "white";
          if ((idx >= 7 && props.userRank.num >= 7) || idx >= 9) return "";
          return (
            <Line
              background={background}
              first={Number(ele.num) + 1}
              second={ele.id}
              third={ele.complete}
              key={idx}
            />
          );
        })}
        {props.userRank.num >= 7 ? (
          <>
            <P>.</P>
            <P>.</P>
            <P>.</P>
            <Line
              background={"gray"}
              first={props.userRank.num}
              second={props.userRank.id}
              third={props.userRank.complete}
            />
          </>
        ) : (
          ""
        )}
      </Content>
    </Wrapper>
  );
};

const HeadLine = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1%;
  font-size: 18px;
  font-weight: 900;
`;

const Wrapper = styled.div`
  width: 80%;
  margin: 1.5% 12% 0 12%;
`;

const Content = styled.div`
  margin: 0 1%;
`;

const P = styled.p`
  text-align: center;
  font-size: 15px;
  font-weight: 900;
  margin-bottom: 7px;
`;

export default RankingTable;
