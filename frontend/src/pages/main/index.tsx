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
  const [imgInfo, setInfo] = useState(dummy_image);
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
      img = img.file_name;
      const img_info = img.data;
      console.log(img_info);
      setInfo(img_info);
      loadingImg(img);
      const img = (await response.json()).data;
      getImgfile(img);
    }
  };
  const getImgfile = async (imgurl: any) => {
    const img = imgurl.map(async (ele: any) => {
      return await fetch(`${process.env.REACT_APP_STATIC_URL}/${ele}`)
        .then((res) => res.blob())
        .then((imgBlob) => URL.createObjectURL(imgBlob));
    });

    console.log(img);

    const imgBlob = await Promise.all(img.map((ele: any) => ele));
    setSrc(imgBlob);
  };

  /*
  const loadingImg = async (imgurl: any) => {
    const blob = await getImgfile(imgurl);
    console.log(blob);
    const readerResultArr = getFileData(blob);
    const imgSrc = await Promise.all(readerResultArr.map((ele: any) => ele));
    setSrc(imgSrc);
  };

  const getFileData = (file: any) => {
    const ret = file.map(async (ele: any) => {
      return await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(ele);
      });
    });
    return ret;
  };
  */

  useEffect(() => {
    getImgUrl();
  }, []);

  return (
    <Wrapper>
      <Header />
      <Container>
        <Search />
        <ImageCard img={src} img_info={imgInfo} />
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
