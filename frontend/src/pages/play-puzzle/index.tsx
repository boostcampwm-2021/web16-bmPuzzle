import React, { useRef } from "react";
import styled from "styled-components";
import Header from "@components/header/index";
import PuzzleCanvas from "@components/puzzle-canvas/index";

const imgStyle = {
  display: "none",
};
const PlayPuzzle = () => {
  const imgRef = useRef(null);
  return (
    <div>
      <Header />
      <PuzzleCanvas puzzleImg={imgRef} />
      <img
        ref={imgRef}
        id="puzzleImage"
        style={imgStyle}
        src="https://cphoto.asiae.co.kr/listimglink/6/2019110809333471277_1573173214.png"
        alt="puzzleImage"
      />
      <img
        id="empty"
        style={imgStyle}
        src="https://cphoto.asiae.co.kr/listimglink/6/2019110809333471277_1573173214.png"
        alt="emptyImage"
      />
    </div>
  );
};

export default PlayPuzzle;
