import React, { useRef, useState } from "react";
import styled from "styled-components";
import Header from "@components/header/index";
import PuzzleCanvas from "@components/puzzle-canvas/index";
import Chat from "@src/components/chat/index";
import io from "socket.io-client";

const PlayPuzzle = () => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  const onLoad = () => setLoaded(true);
  const socket = io("http://localhost:5000", { path: "/room" });
  return (
    <Wrapper>
      <Header />
      <Body>
        <Chat socket={socket} />
        <ComponentImg
          ref={imgRef}
          id="puzzleImage"
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
          alt="puzzleImage"
          onLoad={onLoad}
        />
        <ComponentImg
          id="empty"
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
          alt="emptyImage"
        />
        {loaded && <PuzzleCanvas puzzleImg={imgRef} />}
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
`;

const ComponentImg = styled.img`
  object-fit: none;
  display: none;
  position: absolute;
`;

export default PlayPuzzle;
