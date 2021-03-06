import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import colors from "@styles/theme";

import Header from "@components/common/header/index";
import Search from "@components/main/search-bar/index";
import ImageCard from "@components/common/image-card/index";
import UploadBtn from "@components/main/upload-button/index";
import getImgfile from "@js/get-img-file";
import infiniteScroll from "@hooks/use-infinite-scroll";

const Main = () => {
  let dummy_image: object[] = [];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [img, setImg] = useState(dummy_image);
  const [filterImg, setFilterImg] = useState<object[] | undefined>(dummy_image);
  const getItem = 10;
  const firstNumber = 0;
  const margin = 25;

  const fetchGetImginfo = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/search`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  };

  const getImgUrl = async (prev: number) => {
    let ret;
    if (img === undefined) return;
    if (cache === undefined) {
      try {
        const response = await fetchGetImginfo();
        ret = await response.json();
        setCache(ret);
      } catch (error) {
        throw error;
      }
    }
    ret = ret === undefined ? cache : ret;

    const fn = ret.fileName.slice(prev, prev + getItem);
    const data = ret.data.slice(prev, prev + getItem);

    if (fn.length === 0) {
      setIsDone(true);
      return;
    }

    setImg((prevState) => [...prevState, ...getImgfile(fn, data)]);
    setIsSet(false);
  };

  const [setIsSet, setIsDone, cache, setCache] = infiniteScroll(
    getImgUrl,
    containerRef.current
  );

  useEffect(() => {
    getImgUrl(firstNumber);
  }, []);

  return (
    <Wrapper>
      <Header />
      <Container ref={containerRef}>
        <Search setImg={setFilterImg} />
        <ImageCard
          img={
            (filterImg !== undefined && filterImg.length > firstNumber) ||
            filterImg === undefined
              ? filterImg
              : img
          }
          margin={margin}
          my={undefined}
          shareControl={undefined}
        />
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
