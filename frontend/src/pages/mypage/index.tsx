import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import colors from "@styles/theme";

import Header from "@components/common/header/index";
import ImageCard from "@components/common/image-card/index";
import TitleBar from "@components/common/title-bar/index";
import ShareModal from "@components/mypage/share-modal/index";
import getImgfile from "@js/get-img-file";
import infiniteScroll from "@hooks/use-infinite-scroll";
import accountImg from "@images/account-black-icon.png";

import { getID } from "@src/js/is-login";

const Mypage = () => {
  let dummy_image: object[] = [];
  let dummy_user: undefined = undefined;
  const [user, setUser] = useState<undefined | string | null>(dummy_user);
  const [upload, setUpload] = useState(dummy_image);
  const [done, setDone] = useState(dummy_image);
  const [current, setCurrent] = useState<string | undefined>(undefined);
  const [shareModalInfo, setShareModalInfo] = useState({
    show: false,
    img: "",
    link: "",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const getItem = 10;

  const handleMove = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const element = event.currentTarget as HTMLElement;
    setCurrent(element.id);
  };

  const setShareModal = (show: boolean, img: string, link: string) => {
    setShareModalInfo({ show: show, img: img, link: link });
  };

  const fetchMypage = async () => {
    return fetch(`${process.env.REACT_APP_API_URL}/my`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: getID(),
      }),
    });
  };

  const myPageEnter = async (prev: number) => {
    setUser(getID());

    let ret;
    if (cache === undefined) {
      const response = await fetchMypage();
      ret = await response.json();
      setCache(ret);
    }

    ret = ret === undefined ? cache : ret;

    const uploadFile = ret.uploadName.slice(prev, prev + getItem);
    const uploadFileInfo = ret.uploadData.slice(prev, prev + getItem);
    const doneFile = ret.doneName.slice(prev, prev + getItem);
    const doneFileInfo = ret.doneData.slice(prev, prev + getItem);

    const condition =
      ret.uploadName.length > ret.doneName.length ? true : false;

    if (
      ((condition && uploadFile.length === 0) ||
        (!condition && doneFile.length === 0)) &&
      containerRef.current !== null
    ) {
      setIsDone(true);
      return;
    }

    prev += getItem;
    setUpload((prevState) => [
      ...prevState,
      ...getImgfile(uploadFile, uploadFileInfo),
    ]);
    setDone((prevState) => [
      ...prevState,
      ...getImgfile(doneFile, doneFileInfo),
    ]);
    setIsSet(false);
  };

  const [setIsSet, setIsDone, cache, setCache] = infiniteScroll(
    myPageEnter,
    containerRef.current
  );

  useEffect(() => {
    myPageEnter(0);
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
        <Container ref={containerRef}>
          <TitleBar
            text={`Hello, ${user} :)`}
            img={accountImg}
            btn={"logout"}
          />
          <ImageCard
            img={current === "upload" ? upload : done}
            my={current === "upload" ? "up" : "done"}
            shareControl={setShareModal}
            margin={0}
          />
        </Container>
      </ContainerWrapper>
      <ShareModal
        info={shareModalInfo}
        shareControl={setShareModal}
      ></ShareModal>
    </Wrapper>
  );
};

type propsType = {
  id: string;
  onClick: React.MouseEventHandler;
  cur: string | undefined;
};
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  width: 80%;
  height: 70%;
  margin: 5% 10%;
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
  position: absolute;
  display: flex;
  height: fit-content;
  width: fit-content;
  right: 10%;
  transform: translate(0%, -100%);
`;
const ContainerWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

export default Mypage;
