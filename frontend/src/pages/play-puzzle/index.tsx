import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { SocketContext, socket } from "@src/context/socket";
import styled from "styled-components";

import Header from "@src/components/common/header/index";
import PuzzleCanvas from "@src/components/play-puzzle/puzzle-canvas/index";
import Chat from "@src/components/play-puzzle/chat/index";
import PlayroomMenuBtn from "@src/components/play-puzzle/playroom-btn";
import Warning from "@pages/warning/index";

const PlayPuzzle = (props: any) => {
  const [loaded, setLoaded] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [hintShow, setHintShow] = useState(false);
  const [puzzleInfo, setPuzzleInfo] = useState<any>({ img: "", level: 1 });
  const [isFirstClient, setFirstClient] = useState<boolean | undefined>(
    undefined
  );
  const [time, setTime] = useState({ minutes: 0, seconds: 0 });
  const imgRef = useRef(null);
  const onLoad = () => setLoaded(true);
  const { puzzleID, roomID } = props.match.params;
  const history = useHistory();
  const user = window.sessionStorage.getItem("id");

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
    if (puzzleInfo.img === "" && isFirstClient !== undefined) {
      const res: any = await getPuzzleInfo();
      if (res === undefined) history.go(-1);
      res.image = `${process.env.REACT_APP_STATIC_URL}/${res.img}`;
      setPuzzleInfo({ img: res.image, level: res.level });
    }
  };

  useEffect(() => {
    setPuzzle();
    socket.on("isFirstUser", (res) => {
      setFirstClient(res.isFirstUser);
    });
    socket.emit("joinRoom", { roomID: roomID });
    socket.on("isFull", () => {
      history.push("/warning");
    });
    return () => {
      socket.emit("leaveRoom", { roomID: roomID });
    };
  }, [roomID, setPuzzle]);

  return (
    <Wrapper>
      {user === null && <Warning user="none" />}
      <Header
        isPlayRoom={true}
        chatVisible={chatVisible}
        setChatVisible={setChatVisible}
        time={time}
        setTime={setTime}
        isFirstClient={isFirstClient}
        roomID={roomID}
      />
      <Body>
        {user !== null && (
          <SocketContext.Provider value={socket}>
            <Chat chatVisible={chatVisible} roomID={roomID} />
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
            {loaded && isFirstClient !== undefined && (
              <PuzzleCanvas
                puzzleImg={imgRef}
                level={puzzleInfo.level}
                isFirstClient={isFirstClient}
                roomID={roomID}
                puzzleID={puzzleID}
                time={time}
              />
            )}
          </SocketContext.Provider>
        )}
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
  overflow: hidden;
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const ComponentImg = styled.img<ComponentImgType>`
  z-index: 1;
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
