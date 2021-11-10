import React from "react";
import styled from "styled-components";

import hintBtnImg from "@images/hint-button.png";

const HintBtn = () => {
  return (
    <HintButton>
      <img src={hintBtnImg} alt="hint" />
    </HintButton>
  );
};

const HintButton = styled.button`
  background: none;
  border: none;
  width: 70px;
  height: 70px;
  &:hover {
    cursor: pointer;
  }
`;

export default HintBtn;
