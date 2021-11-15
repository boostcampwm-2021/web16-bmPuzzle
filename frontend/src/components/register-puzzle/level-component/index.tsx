import { FC } from "react";
import styled from "styled-components";

const LevelDiv = styled.div`
  display: flex;
`;

const LevelComponent: FC<{
  number: number;
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
        value={props.number}
        checked={props.number === props.checkedLevel}
        onChange={() => {
          checkEvent(props.number);
        }}
      />
      <span className="renderStars">{Array(props.number).fill("⭐️")}</span>
    </LevelDiv>
  );
};

export default LevelComponent;
