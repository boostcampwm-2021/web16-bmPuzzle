import React from "react";
import styled from "styled-components";
import { CopyToClipboard } from "react-copy-to-clipboard";

import copyLinkBtnImg from "@images/copy-link-button.png";

const CopyBtn = () => {
  const currentUrl = window.location.href;
  const copySucceed = () => {
    alert("링크가 클립보드에 복사되었습니다.");
  };
  return (
    <CopyToClipboard text={currentUrl} onCopy={copySucceed}>
      <CopyButton>
        <img src={copyLinkBtnImg} alt="copy link" />
      </CopyButton>
    </CopyToClipboard>
  );
};

const CopyButton = styled.button`
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
export default CopyBtn;
