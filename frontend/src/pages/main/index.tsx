/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import colors from "@styles/theme";
import Header from "@components/common/header/index";
import Search from "@components/main/search-bar/index";
import ImageCard from "@components/common/image-card/index";
import UploadBtn from "@components/main/upload-button/index";

import getImgfile from "@js/get-img-file";

const Main = () => {
  let dummy_image: any[] = [];
  const containerRef: any = useRef(null);
  const [img, setImg] = useState(dummy_image);
  let prev = 0;
  const getItem = 4;
  let cache: any[];

  const getImgUrl = async () => {
    console.log("hey");
    let ret;
    if (cache === undefined) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/search`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        ret = await response.json();
        cache = ret;
      }
    }

    ret = ret === undefined ? cache : ret;

    const fn = ret.fileName.slice(prev, prev + getItem);
    const data = ret.data.slice(prev, prev + getItem);

    if (fn.length === 0) {
      console.log("adsfjlaksjld");
      containerRef.current.removeEventListener("scroll", infiniteScroll);
      return;
    }

    prev += getItem;
    setImg((prevState) => [...prevState, ...getImgfile(fn, data)]);
  };

  const infiniteScroll = () => {
    const ref: any = containerRef.current;
    const scrollHeight = ref.scrollHeight;
    const scrollTop = ref.scrollTop;
    const clientHeight = ref.clientHeight;

    const ret = Math.floor(scrollTop) + clientHeight;
    if (ret === scrollHeight || ret === scrollHeight - 1) getImgUrl();
  };

  useEffect(() => {
    getImgUrl();
    containerRef.current.addEventListener("scroll", infiniteScroll);
  }, []);

  return (
    <Wrapper>
      <Header />
      <Container ref={containerRef}>
        <Search setImg={setImg} />
        <ImageCard img={img} margin={25} />
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
