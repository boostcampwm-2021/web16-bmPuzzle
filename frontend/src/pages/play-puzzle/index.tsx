import React, { useEffect, useRef, useState, FC } from "react";
import { useHistory } from "react-router";
import { SocketContext, socket } from "@src/context/socket";
import styled from "styled-components";
import { useLocation } from "react-router";
import Header from "@src/components/common/header/index";
import PuzzleCanvas from "@src/components/play-puzzle/puzzle-canvas/index";
import Chat from "@src/components/play-puzzle/chat/index";
import PlayroomMenuBtn from "@src/components/play-puzzle/playroom-btn";
import Warning from "@pages/warning/index";

type puzzleInfoType = {
  img: string;
  level: number;
};
const PlayPuzzle: FC<{
  match: { params: { puzzleID: string; roomID: string } };
}> = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const location = useLocation();
  const history = useHistory();
  const user = window.sessionStorage.getItem("id");
  const [loaded, setLoaded] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [hintShow, setHintShow] = useState(false);
  const [puzzleInfo, setPuzzleInfo] = useState<puzzleInfoType>({
    img: "",
    level: 1,
  });
  const [isFirstClient, setFirstClient] = useState<boolean | undefined>(
    undefined
  );
  const [time, setTime] = useState({
    minutes: 0,
    seconds: 0,
    startTime: Date.now(),
  });
  const imgRef = useRef(null);
  const onLoad = () => setLoaded(true);
  const { puzzleID, roomID } = props.match.params;

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
    const res: puzzleInfoType | undefined = await getPuzzleInfo();
    if (res === undefined) {
      history.go(-1);
      return;
    }
    res.img = `${process.env.REACT_APP_STATIC_URL}/${res.img}`;
    setPuzzleInfo({ img: res.img, level: res.level });
  };

  useEffect(() => {
    if (user === null) return;
    if (isFirstClient === undefined) {
      setPuzzle();
    }
    socket.emit("joinRoom", { roomID: roomID });
    socket.on("isFirstUser", (res) => {
      setFirstClient(res.isFirstUser);
    });
    socket.on("isFull", () => {
      history.push({ pathname: "/warning", state: { warn: "isFull" } });
    });
    return () => {
      socket.emit("leaveRoom", { roomID: roomID });
    };
  }, [isFirstClient]);

  return (
    <Wrapper>
      {user === null && <Warning warn="noUser" prevPath={location.pathname} />}
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
