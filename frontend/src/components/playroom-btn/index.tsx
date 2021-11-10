import React from "react";
import styled from "styled-components";

import CopyBtn from "@src/components/playroom-btn/copy-link-btn";
import HintBtn from "@src/components/playroom-btn/hint-btn";

import playroomMenuBtnImg from "@images/playroom-menu-button.png";

const PlayroomMenuBtn = () => {
  return (
    <MenuWrap>
      <MenuDetailWrap>
        <CopyBtn></CopyBtn>
        <HintBtn></HintBtn>
      </MenuDetailWrap>
    </MenuWrap>
  );
};

const MenuWrap = styled.div`
  position: absolute;
  right: 15%;
  left: 15%;
`;
const MenuDetailWrap = styled.div`
  margin-bottom: 5px;
  padding: 10px 3px;
  background: yellow;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default PlayroomMenuBtn;
