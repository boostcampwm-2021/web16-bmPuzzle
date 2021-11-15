import React, { useState } from "react";
import styled from "styled-components";

import KakaoShareBtn from "@components/share-modal/kakao-share-btn/index";

const ShareModal = ({
  info,
  shareControl,
}: shareModalType & shareControlType) => {
  return (
    <ShareModalWrap
      info={info}
      onClick={() => {
        shareControl(false, "", "");
      }}
    >
      <ShareModalContent
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div>공유하기</div>
        <img id="share-puzzle" src={info.img} alt="puzzle-img" />
        <ShareButtons>
          <KakaoShareBtn img={info.img} link={info.link}></KakaoShareBtn>
        </ShareButtons>
      </ShareModalContent>
    </ShareModalWrap>
  );
};

type infoType = {
  show: boolean;
  img: string;
  link: string;
};

type shareControlType = {
  shareControl: any;
};

type shareModalType = {
  info: infoType;
};

const ShareModalWrap = styled.div<shareModalType>`
  display: ${(props) => (props.info.show ? "block" : "none")};
  position: absolute;
  left: 0%;
  top: 0%;
  width: 100%;
  height: 100%;
  background: #42424266;
`;

const ShareModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border: none;
  box-sizing: border-box;
  padding: 30px;
  width: 500px;
  height: 400px;
  border-radius: 50px;
  filter: drop-shadow(3px 3px 3px #424242aa);
  div {
    font-size: 20px;
    font-weight: bold;
  }
  #share-puzzle {
    max-width: 400px;
    max-height: 255px;
    margin-top: 20px;
    object-fit: scale-down;
  }
`;

const ShareButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;
export default ShareModal;
