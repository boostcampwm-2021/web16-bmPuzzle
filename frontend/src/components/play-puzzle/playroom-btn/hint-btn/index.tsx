import React from "react";
import styled from "styled-components";

import hintBtnImg from "@images/hint-button.png";

interface HintBtnProps {
  hintFunc: (arg0: boolean) => void;
  hintState: boolean;
}

const HintBtn = ({ hintFunc, hintState }: HintBtnProps) => {
  const hintShow = () => {
    if (hintState) return;
    hintFunc(true);
  };
  const hintHide = () => {
    if (!hintState) return;
    hintFunc(false);
  };
  return (
    <HintButton onMouseEnter={hintShow} onMouseLeave={hintHide}>
      <img src={hintBtnImg} alt="hint" />
    </HintButton>
  );
};

const HintButton = styled.button`
  z-index: 2;
  background: none;
  border: none;
  padding: 0px;
  width: 70px;
  height: 70px;
  &:hover {
    cursor: pointer;
  }
  img {
    width: 70px;
    heigth: 70px;
    filter: drop-shadow(3px 3px 3px #424242);
  }
`;

export default HintBtn;
