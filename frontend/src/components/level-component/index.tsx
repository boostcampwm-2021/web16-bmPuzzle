import { FC, useState } from "react";
import styled from "styled-components";

const LevelDiv = styled.div`
  display: flex;
`;

const LevelComponent: FC<{
  num: number;
  checkedLevel: number;
  checkFunction: (value: number) => void;
}> = (props) => {
  const checkEvent = (value: number) => {
    props.checkFunction(value);
  };
  return (
    <LevelDiv>
      <input
        type="radio"
        value={props.num}
        checked={props.num === props.checkedLevel}
        onChange={() => {
          checkEvent(props.num);
        }}
      />
      <span className="renderStars">{Array(props.num).fill("⭐️")}</span>
    </LevelDiv>
  );
};

export default LevelComponent;
