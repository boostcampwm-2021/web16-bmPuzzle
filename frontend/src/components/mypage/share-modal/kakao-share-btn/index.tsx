import React, { useEffect } from "react";
import styled from "styled-components";

import kakao_share_btn_img from "@images/ic_kakao.svg";

const KakaoShareBtn = ({ img, link }: KakaoType) => {
  let shareUrl: string;
  useEffect(() => {
    shareUrl = `${process.env.REACT_APP_BASE_URL}${link}`;
    console.log(shareUrl);
    createKakaoBtn();
  }, [link]);

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
          imageUrl: img,
          link: {
            webUrl: shareUrl,
            mobileWebUrl: shareUrl,
          },
        },
        buttons: [
          {
            title: "퍼즐 맞추러 GO~!",
            link: {
              webUrl: shareUrl,
              mobileWebUrl: shareUrl,
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

type KakaoType = {
  img: string;
  link: string;
};

const Button = styled.button`
  background: none;
  border: none;
  &: hover {
    cursor: pointer;
  }
`;
export default KakaoShareBtn;
