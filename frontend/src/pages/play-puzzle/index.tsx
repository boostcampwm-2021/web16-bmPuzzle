import React, { useRef, useState } from "react";
import styled from "styled-components";
import Header from "@components/header/index";
import PuzzleCanvas from "@components/puzzle-canvas/index";
import Chat from "@src/components/chat/index";
import PlayroomMenuBtn from "@src/components/playroom-btn";
import io from "socket.io-client";
import { fetchPost } from "@src/utils/fetch";

const PlayPuzzle = (props: any) => {
  const [loaded, setLoaded] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [hintShow, setHintShow] = useState(false);
  const imgRef = useRef(null);
  const onLoad = () => setLoaded(true);
  const { params } = props.match;
  const socket = io("http://localhost:5000/");
  socket.emit("joinRoom", { roomID: params.roomID });
  return (
    <Wrapper>
      <Header
        isPlayRoom={true}
        chatVisible={chatVisible}
        setChatVisible={setChatVisible}
      />
      <Body>
        {loaded && (
          <Chat
            socket={socket}
            roomID={params.roomID}
            chatVisible={chatVisible}
          />
        )}
        <PlayroomMenuBtn
          hintFunc={setHintShow}
          hintState={hintShow}
        ></PlayroomMenuBtn>
        <ComponentImg
          ref={imgRef}
          id="puzzleImage"
          src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v1026-08-ktdpo2hf.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=762649fdf7d66f68f0d5fc1c694ce3ac"
          alt="puzzleImage"
          onLoad={onLoad}
          show={hintShow}
        />
        <ComponentImg
          id="empty"
          src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v1026-08-ktdpo2hf.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=762649fdf7d66f68f0d5fc1c694ce3ac"
          alt="emptyImage"
          show={hintShow}
        />
        {loaded && <PuzzleCanvas puzzleImg={imgRef} />}
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
