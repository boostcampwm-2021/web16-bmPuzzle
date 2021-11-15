import React from "react";
import styled from "styled-components";

const RankingLine = (props: any) => {
  console.log(props.background, props.first);
  return (
    <Line background={props.background}>
      <span>{props.first}</span>
      <span>{props.second}</span>
      <span>{props.third}</span>
    </Line>
  );
};

type backgroundType = {
  background: string | undefined;
};

const Line = styled.div<backgroundType>`
  background-color: ${(props) => props.background || "white"};
  display: flex;
  justify-content: space-between;
  padding: 1%;
`;

export default RankingLine;
