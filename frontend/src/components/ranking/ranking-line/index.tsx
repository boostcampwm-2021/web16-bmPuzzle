import React from "react";
import styled from "styled-components";

type propsType = {
  background: string;
  first: number;
  second: string;
  third: number;
};

const RankingLine = (props: propsType) => {
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
