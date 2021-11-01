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
  const res = [...Array(num).keys()].map((i) => value);
  return res;
};
const LevelComponent: React.FC<Props> = ({ num }) => {
  return (
    <LevelDiv>
      <input type="checkbox" value={num} />
      <div className="renderStars">{renderStars(num)}</div>
    </LevelDiv>
  );
};

export default LevelComponent;
