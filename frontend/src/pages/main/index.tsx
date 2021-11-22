/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "@styles/theme";
import { useInView } from "react-intersection-observer";
import Header from "@components/common/header/index";
import Search from "@components/main/search-bar/index";
import ImageCard from "@components/common/image-card/index";
import UploadBtn from "@components/main/upload-button/index";

import getImgfile from "@js/get-img-file";

const Main = () => {
  let dummy_image: any[] = [];
  const [img, setImg] = useState(dummy_image);
  const [page, setPage] = useState(1);
  const [viewRef, inView] = useInView();
  const getImgUrl = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/search/${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (response.ok) {
      let img = await response.json();
      setImg((prevState) => [
        ...prevState,
        ...getImgfile(img.fileName, img.data),
      ]);
    }
  };

  useEffect(() => {
    console.log(page);
    getImgUrl();
  }, [page]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView]);
  return (
    <Wrapper>
      <Header />
      <Container>
        <Search setImg={setImg} />
        <ImageCard img={img} margin={25} viewRef={viewRef} />
        <UploadBtn />
      </Container>
    </Wrapper>
  );
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
  overflow-y: scroll;
`;

export default Main;
