import React, { useState } from "react";
import styled from "styled-components";

import CopyBtn from "@src/components/playroom-btn/copy-link-btn";
import HintBtn from "@src/components/playroom-btn/hint-btn";

import playroomMenuBtnImg from "@images/playroom-menu-button.png";

interface PlayerRoomMenuProps {
  hintFunc: any;
  hintState: boolean;
}

const PlayroomMenuBtn = ({ hintFunc, hintState }: PlayerRoomMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const clickMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <MenuWrap>
      <MenuDetailWrap show={menuOpen}>
        <HintBtn hintFunc={hintFunc} hintState={hintState}></HintBtn>
        <CopyBtn></CopyBtn>
      </MenuDetailWrap>
      <MenuButtonWrap>
        <MenuButton onClick={clickMenu}>
          <img src={playroomMenuBtnImg} alt="menu" />
        </MenuButton>
      </MenuButtonWrap>
    </MenuWrap>
  );
};

interface MenuDetailType {
  show: boolean;
}

const MenuWrap = styled.div`
  position: absolute;
  right: 5%;
  bottom: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MenuDetailWrap = styled.div<MenuDetailType>`
  display: ${(props) => (props.show ? "flex" : "none")};
  margin-bottom: 20px;
  padding: 10px 40px;
  background: #f6f3f9;
  justify-content: space-between;
  align-items: center;
  width: 250px;
  height: 90px;
  box-sizing: border-box;
  border-radius: 50px;
`;
const MenuButtonWrap = styled.div`
  width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  padding: 0px;
  width: 100px;
  height: 100px;
  &:hover {
    cursor: pointer;
  }
  img {
    width: 100px;
    heigth: 100px;
  }
`;

export default PlayroomMenuBtn;
