import React from "react";
import styled from "styled-components";

const LevelDiv = styled.div`
  display: flex;
`;

type Props = {
  num: number;
};

const renderStars = (num: number) => {
  let value = "⭐";
  const res = [...Array(Number(num)).keys()].map((i) => value);
  return res;
};
const LevelComponent = (props: Props) => {
  return (
    <LevelDiv>
      <input type="checkbox" value={props.num} />
      <div className="renderStars">{renderStars(props.num)}</div>
    </LevelDiv>
  );
};

export default LevelComponent;
