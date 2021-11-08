import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Header from "@components/header/index";
import PuzzleCanvas from "@components/puzzle-canvas/index";

const imgStyle = {
  display: "none",
};
const PlayPuzzle = () => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  const onLoad = () => setLoaded(true);
  return (
    <div>
      <Header />
      <img
        ref={imgRef}
        style={imgStyle}
        id="puzzleImage"
        src="https://cphoto.asiae.co.kr/listimglink/6/2019110809333471277_1573173214.png"
        alt="puzzleImage"
        onLoad={onLoad}
      />
      <img
        id="empty"
        style={imgStyle}
        src="https://cphoto.asiae.co.kr/listimglink/6/2019110809333471277_1573173214.png"
        alt="emptyImage"
      />
      {loaded && <PuzzleCanvas puzzleImg={imgRef} />}
    </div>
  );
};

export default PlayPuzzle;
