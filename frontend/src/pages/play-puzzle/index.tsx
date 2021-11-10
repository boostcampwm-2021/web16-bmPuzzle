import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Header from "@components/header/index";
import PuzzleCanvas from "@components/puzzle-canvas/index";
import Chat from "@src/components/chat/index";
import io from "socket.io-client";
import { useHistory } from "react-router";
import { inherits } from "util";

const PlayPuzzle = (props: any) => {
  const [loaded, setLoaded] = useState(false);
  const [puzzleInfo, setPuzzleInfo] = useState({ img: "", level: 1 });
  const imgRef = useRef(null);
  const onLoad = () => setLoaded(true);
  const { puzzleID, roomID } = props.match.params;
  const history = useHistory();
  const getPuzzleInfo = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/room/${puzzleID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 500) return undefined;
    const resJSON = await response.json();
    return { img: resJSON.img, level: resJSON.level };
  };

  const setPuzzle = async () => {
    const res: any = await getPuzzleInfo();
    if (res === undefined) history.go(-1);
    res.image = `${process.env.REACT_APP_STATIC_URL}/${res.img}`;
    if (res.level !== puzzleInfo.level || res.image !== puzzleInfo.img) {
      setPuzzleInfo({ img: res.image, level: res.level });
    }
  };
  const setSocket = () => {
    const socket = io("http://localhost:5000/");
    socket.emit("joinRoom", { roomID: roomID });
    return socket;
  };
  setPuzzle();
  console.log(puzzleInfo);
  const socket = setSocket();
  return (
    <Wrapper>
      <Header />
      <Body>
        <Chat socket={socket} roomID={roomID} />
        <ComponentImg
          ref={imgRef}
          id="puzzleImage"
          src={puzzleInfo.img}
          alt="puzzleImage"
          onLoad={onLoad}
        />
        <ComponentImg id="empty" src={puzzleInfo.img} alt="emptyImage" />
        {loaded && (
          <PuzzleCanvas puzzleImg={imgRef} level={puzzleInfo.level + 1} />
        )}
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
