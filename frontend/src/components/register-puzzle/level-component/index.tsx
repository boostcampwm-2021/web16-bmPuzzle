import React from "react";
import styled from "styled-components";

const LevelDiv = styled.div`
  display: flex;
`;

type Props = {
  num: number;
  checkedLevel: number;
  checkFunction: any;
};

const renderStars = (num: number) => {
  let value = "⭐";
  const res = [...Array(Number(num)).keys()].map((i) => value);
  return res;
};

const LevelComponent = (props: Props) => {
  const checkEvent = (value: number) => {
    props.checkFunction(value);
  };
  return (
    <LevelDiv>
      <input
        type="checkbox"
        value={props.num}
        checked={props.num === props.checkedLevel}
        onClick={() => {
          checkEvent(props.num);
        }}
      />
      <div className="renderStars">{renderStars(props.num)}</div>
    </LevelDiv>
  );
};

export default LevelComponent;
