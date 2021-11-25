import React, { useState } from "react";
import styled from "styled-components";

import CopyBtn from "@components/play-puzzle/playroom-btn/copy-link-btn";
import HintBtn from "@components/play-puzzle/playroom-btn/hint-btn";

import playroomMenuBtnImg from "@images/playroom-menu-button.png";

interface PlayerRoomMenuProps {
  hintFunc: (arg0: boolean) => void;
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
        <CopyBtn />
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

const MenuBtnLoc = {
  right: 0.08,
  bottom: 0.03,
};

const MenuDetailRelativeLoc = {
  right: 75,
  bottom: 95,
};

const MenuWrap = styled.div`
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MenuDetailWrap = styled.div<MenuDetailType>`
  position: absolute;
  right: ${window.innerWidth * MenuBtnLoc.right -
  MenuDetailRelativeLoc.right}px;
  bottom: ${window.innerHeight * MenuBtnLoc.bottom +
  MenuDetailRelativeLoc.bottom}px;
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuButton = styled.button`
  position: absolute;
  right: ${window.innerWidth * MenuBtnLoc.right}px;
  bottom: ${window.innerHeight * MenuBtnLoc.bottom}px;
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
