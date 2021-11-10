import React from "react";
import styled from "styled-components";

import hintBtnImg from "@images/hint-button.png";
import { isConstructorDeclaration } from "typescript";

interface HintBtnProps {
  hintFunc: any;
  hintState: boolean;
}

const HintBtn = ({ hintFunc, hintState }: HintBtnProps) => {
  const hintShow = () => {
    console.log("a");
    if (hintState) return;
    hintFunc(true);
  };
  const hintHide = () => {
    console.log("b");
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
