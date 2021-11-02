import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "@styles/theme";

import Header from "@components/header/index";
import Search from "@components/main/search-bar/index";
import ImageCard from "@src/components/main/image-card/index";

const Main = () => {
  let dummy_index: number;
  dummy_index = 0;
  let dummy_image: object[] = [];
  const dummy_current: any = "";
  const [search, setSearch] = useState("");
  const [imgArr, setImgArr] = useState(undefined);
  const [idx, setIdx] = useState(dummy_index);
  const [currentImg, setcurrentImg] = useState(dummy_current);
  const [imgCache, setImgCache] = useState(dummy_image);

  const getImgUrl = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/search`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (response.ok) {
      const img = (await response.json()).data;
      setIdx(0);
      setImgArr(img);
      loadingImg(img[0], 0);
    }
  };
  const getImgfile = async (imgurl: any, index: any) => {
    console.log(imgurl);
    const img = await fetch(`${process.env.REACT_APP_STATIC_URL}/${imgurl}`)
      .then((res) => res.blob())
      .then((imgBlob) => imgBlob);

    const cacheObj = { index: index, url: img };
    setImgCache([...imgCache, cacheObj]);
    return img;
  };
  const loadingImg = async (imgurl: any, index: any) => {
    const img: any = imgCache.find((cache: any) => cache.index === index);
    const blob = img === undefined ? await getImgfile(imgurl, index) : img.url;
    const reader = new FileReader();

    reader.onload = () => {
      setcurrentImg(reader.result);
    };
    reader.readAsDataURL(blob);
  };
  useEffect(() => {
    getImgUrl();
  }, []);

  return (
    <Wrapper>
      <Header />
      <Container>
        <Search />
        <ImageCard />
      </Container>
      <img id="avatar" src={currentImg} />
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
