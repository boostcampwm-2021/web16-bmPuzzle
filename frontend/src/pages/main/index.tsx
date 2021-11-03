/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "@styles/theme";

import Header from "@components/header/index";
import Search from "@components/search-bar/index";
import ImageCard from "@components/image-card/index";

const Main = () => {
  let dummy_image: any[] = [];
  const [src, setSrc] = useState(dummy_image);
  const getImgUrl = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/search`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (response.ok) {
      let img = await response.json();
      getImgfile(img.file_name, img.data);
    }
  };
  const getImgfile = async (imgurl: any, imgInfo: any) => {
    const img = imgurl.map(async (ele: any) => {
      return await fetch(`${process.env.REACT_APP_STATIC_URL}/${ele}`)
        .then((res) => res.blob())
        .then((imgBlob) => URL.createObjectURL(imgBlob));
    });

    const imgBlob = await Promise.all(img.map((ele: any) => ele));
    imgInfo.forEach((ele: any, idx: number) => {
      ele.image = imgBlob[idx];
    });
    setSrc(imgInfo);
  };

  useEffect(() => {
    getImgUrl();
  }, []);

  return (
    <Wrapper>
      <Header />
      <Container>
        <Search />
        <ImageCard img={src} />
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
