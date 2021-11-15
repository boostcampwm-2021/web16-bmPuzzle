import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "@styles/theme";

import Header from "@src/components/common/header/index";
import ImageCard from "@src/components/common/image-card/index";

import TitleBar from "@src/components/common/title-bar/index";
import KakaoShareBtn from "@src/components/mypage/kakao-share-btn/index";
import accountImg from "@images/account-black-icon.png";

import getImgfile from "@src/js/get-img-file";

const Mypage = () => {
  let dummy_image: any[] = [];
  let dummy_user: any = undefined;
  const [user, setUser] = useState(dummy_user);
  const [upload, setUpload] = useState(dummy_image);
  const [done, setDone] = useState(dummy_image);
  const [current, setCurrent] = useState(undefined);

  const handleMove = (e: any) => {
    setCurrent(e.target.id);
  };

  const myPageEnter = async () => {
    setUser(window.sessionStorage.getItem("id"));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/my`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: window.sessionStorage.getItem("id"),
      }),
    });
    if (response.ok) {
      let img = await response.json();
      setUpload(await getImgfile(img.uploadName, img.uploadData));
      setDone(await getImgfile(img.doneName, img.doneData));
    }
  };
  useEffect(() => {
    myPageEnter();
  }, []);

  return (
    <Wrapper>
      <Header />
      <ContainerWrapper>
        <BtnWrapper>
          <Btn id="honor" onClick={handleMove} cur={current}>
            명예의 전당
          </Btn>
          <Btn id="upload" onClick={handleMove} cur={current}>
            퍼즐 저장소
          </Btn>
        </BtnWrapper>
        <Container>
          <TitleBar text={`Hello, ${user} :)`} img={accountImg} />
          <ImageCard img={current === "upload" ? upload : done} />
          <KakaoShareBtn></KakaoShareBtn>
        </Container>
      </ContainerWrapper>
    </Wrapper>
  );
};

type propsType = {
  id: any;
  onClick: any;
  cur: any;
};
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 80%;
  height: 463px;
  margin: 0% 10% 5% 10%;
  border: 1px solid ${colors["gray3"]};
  overflow-y: auto;
`;

const Btn = styled.button<propsType>`
  width: 100px;
  height: 30px;
  background: ${(p) =>
    p.id === p.cur || (p.id === "honor" && p.cur === undefined)
      ? "black"
      : "white"};
  color: ${(p) =>
    p.id === p.cur || (p.id === "honor" && p.cur === undefined)
      ? "white"
      : "black"};
  border: 1px solid rgba(0, 0, 0, 0.3);
  font-weight: 900;

  &: hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  margin: 3.5% 9.8% 0% 10%;
  justify-content: end;
`;
const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Mypage;
