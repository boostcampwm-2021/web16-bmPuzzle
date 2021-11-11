import React, { useEffect } from "react";
import styled from "styled-components";

import kakao_share_btn_img from "@images/ic_kakao.svg";

const KakaoShareBtn = () => {
  useEffect(() => {
    createKakaoBtn();
  }, []);

  const createKakaoBtn = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_KEY);
      }

      kakao.Link.createDefaultButton({
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "bmPuzzle",
          description: "온라인에서 퍼즐을 플레이하세요!",
          imageUrl: "http://assets.paperjs.org/images/marilyn.jpg",
          link: {
            webUrl: "http://localhost:3000/",
            mobileWebUrl: "http://localhost:3000/",
          },
        },
        buttons: [
          {
            title: "퍼즐 맞추러 GO~!",
            link: {
              webUrl: "http://localhost:3000/",
              mobileWebUrl: "http://localhost:3000/",
            },
          },
        ],
      });
    }
  };
  return (
    <div className="kakao-share-btn">
      <Button id="kakao-link-btn">
        <img src={kakao_share_btn_img} alt="kakao-share" />
      </Button>
    </div>
  );
};

const Button = styled.button`
  background: none;
  border: none;
  &: hover {
    cursor: pointer;
  }
`;
export default KakaoShareBtn;
