import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "@components/header/index";
import PuzzleCanvas from "@components/puzzle-canvas/index";
import Chat from "@src/components/chat/index";
import PlayroomMenuBtn from "@src/components/playroom-btn";
import io from "socket.io-client";
import { useHistory } from "react-router";

const PlayPuzzle = (props: any) => {
  const [loaded, setLoaded] = useState(false);
  const [socket, setCurrentSocket] = useState<any>(null);
  const [isShow, setIsShow] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [hintShow, setHintShow] = useState(false);
  const [puzzleInfo, setPuzzleInfo] = useState<any>({ img: "", level: 1 });
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
    if (puzzleInfo.img === "") {
      const res: any = await getPuzzleInfo();
      if (res === undefined) history.go(-1);
      res.image = `${process.env.REACT_APP_STATIC_URL}/${res.img}`;
      setPuzzleInfo({ img: res.image, level: res.level });
    }
  };
  const setSocket = () => {
    const socket = io("http://localhost:5000/", { forceNew: true });
    socket.emit("joinRoom", { roomID: roomID });
    return socket;
  };

  useEffect(() => {
    setCurrentSocket(setSocket());
    setPuzzle();
    return () => {
      if (socket !== undefined && socket !== null) socket.disconnect();
    };
  }, []);
  return (
    <Wrapper>
      <Header
        isPlayRoom={true}
        chatVisible={chatVisible}
        setChatVisible={setChatVisible}
      />
      <Body>
        {socket !== undefined && socket !== null && (
          <Chat socket={socket} roomID={roomID} chatVisible={chatVisible} />
        )}
        <PlayroomMenuBtn
          hintFunc={setHintShow}
          hintState={hintShow}
        ></PlayroomMenuBtn>

        <ComponentImg
          ref={imgRef}
          id="puzzleImage"
          src={puzzleInfo.img}
          alt="puzzleImage"
          onLoad={onLoad}
          show={hintShow}
        />
        <ComponentImg
          id="empty"
          src={puzzleInfo.img}
          alt="emptyImage"
          show={hintShow}
        />
        {loaded && <PuzzleCanvas puzzleImg={imgRef} level={puzzleInfo.level} />}
      </Body>
    </Wrapper>
  );
};

interface ComponentImgType {
  show: boolean;
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const ComponentImg = styled.img<ComponentImgType>`
  object-fit: scale-down;
  width: 80%;
  height: 80%;
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default PlayPuzzle;
