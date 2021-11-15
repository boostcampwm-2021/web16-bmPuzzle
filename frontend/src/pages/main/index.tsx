/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import colors from "@styles/theme";

import Header from "@src/components/common/header/index";
import Search from "@src/components/main/search-bar/index";
import ImageCard from "@src/components/common/image-card/index";
import UploadBtn from "@src/components/main/upload-button/index";

import getImgfile from "@src/js/get-img-file";

const Main = () => {
  let dummy_image: any[] = [];
  const [img, setImg] = useState(dummy_image);
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
      setImg(getImgfile(img.fileName, img.data));
    }
  };

  useEffect(() => {
    getImgUrl();
  }, []);

  return (
    <Wrapper>
      <Header />
      <Container>
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
