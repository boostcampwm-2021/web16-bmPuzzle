import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "@styles/theme";

import Header from "@components/header/index";
import Search from "@components/main/search-bar/index";
import ImageCard from "@src/components/main/image-card/index";

const Main = () => {
  let dummy_index: number;
  dummy_index = 0;
  let dummy_image: any[] = [];

  const dummy_current: any = "";
  const [search, setSearch] = useState("");
  const [imgArr, setImgArr] = useState(undefined);
  const [idx, setIdx] = useState(dummy_index);
  const [src, setSrc] = useState(dummy_image);
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
      img.push("puzzle-icon.png");
      setIdx(0);
      setImgArr(img);
      getImgfile(img);
    }
  };
  const getImgfile = async (imgurl: any) => {
    const img = imgurl.map(async (ele: any) => {
      await fetch(`${process.env.REACT_APP_STATIC_URL}/${ele}`)
        .then((res) => res.blob())
        .then((imgBlob) => {
          const reader = new FileReader();
          reader.readAsDataURL(imgBlob);
          reader.onload = () => {
            setSrc([...src, reader.result]);
            ImageCard(reader.result);
          };
        });
    });

    const imgBlob = await Promise.all(img.map((ele: any) => ele));
    return imgBlob;
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
