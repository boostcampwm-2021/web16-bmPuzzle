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
        src="http://localhost:5000/static/1635993192293.jpeg"
        alt="puzzleImage"
        onLoad={onLoad}
      />
      <img
        id="empty"
        style={imgStyle}
        src="http://localhost:5000/static/1635993192293.jpeg"
        alt="emptyImage"
      />
      {loaded && <PuzzleCanvas puzzleImg={imgRef} />}
    </div>
  );
};

export default PlayPuzzle;
