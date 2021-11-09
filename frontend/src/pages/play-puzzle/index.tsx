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
  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);
  return (
    <div>
      <Header />
      <img
        ref={imgRef}
        style={imgStyle}
        id="puzzleImage"
<<<<<<< HEAD
        src="http://localhost:5000/static/1635993192293.jpeg"
=======
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
>>>>>>> 246311005e8fb598ecbac4bcd1aca0f8c3d5f60f
        alt="puzzleImage"
        onLoad={onLoad}
      />
      <img
        id="empty"
        style={imgStyle}
<<<<<<< HEAD
        src="http://localhost:5000/static/1635993192293.jpeg"
=======
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
>>>>>>> 246311005e8fb598ecbac4bcd1aca0f8c3d5f60f
        alt="emptyImage"
      />
      {loaded && <PuzzleCanvas puzzleImg={imgRef} />}
    </div>
  );
};

export default PlayPuzzle;
