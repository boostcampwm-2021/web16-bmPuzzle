import React, { useEffect, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { SocketContext } from "@context/socket";

import logo_image from "@images/puzzle-icon.png";
import ranking_image from "@images/ranking-icon.png";
import account_image from "@images/account-icon.png";
import chat_image from "@images/chat-icon.png";

const Header = (props: any) => {
  let {
    isPlayRoom,
    chatVisible,
    setChatVisible,
    time,
    setTime,
    isFirstClient,
    roomID,
  } = props;
  const tenSeconds = 10;

  const history = useHistory();
  const ref = useRef<HTMLDivElement>(null);
  const socket = useContext(SocketContext);

  const handleMove = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const element = event.currentTarget as HTMLElement;
    let url: undefined | string = element.id;
    if (element.closest("button")) url = element.closest("button")?.id;
    history.push(`/${url}`);
  };

  const toggleChat = () => setChatVisible(!chatVisible);

  const setTimer = () => {
    if (time !== undefined && isFirstClient)
      socket.emit("setTimer", { roomID: roomID, timer: Date.now() });
  };

  const getTimer = () => {
    if (time !== undefined) {
      socket.on(
        "getTimer",
        (res: { minutes: number; seconds: number; startTime: number }) => {
          if (res.startTime !== undefined) setTime(res);
        }
      );
      socket.emit("getTimer", { roomID: roomID });
    }
  };

  const goTimer = () => {
    if (time !== undefined) {
      const countTime = setInterval(() => {
        const diff = Date.now() - time.startTime;
        const seconds = Math.floor(diff / 1000) % 60;
        const minutes = Math.floor(diff / 1000 / 60);
        if (time.minutes === minutes && time.seconds === seconds) return;
        setTime({
          minutes: minutes,
          seconds: seconds,
          startTime: time.startTime,
        });
      }, 100);
      return () => clearInterval(countTime);
    }
  };

  useEffect(() => setTimer(), [roomID, isFirstClient]);
  useEffect(() => getTimer(), []);
  useEffect(() => goTimer(), [time]);

  return (
    <Wrapper>
      <HomeBtnWrapper isPlayRoom={isPlayRoom}>
        {isPlayRoom && (
          <Btn id="chat" onClick={toggleChat}>
            <Img src={chat_image} alt="chat" />
          </Btn>
        )}
        <Btn id="main" onClick={handleMove}>
          <Img src={logo_image} alt="logo" />
        </Btn>
      </HomeBtnWrapper>
      <RightIconWrapper>
        {isPlayRoom && (
          <TimerWrapper ref={ref}>
            {time.minutes}:
            {time.seconds < tenSeconds ? `0${time.seconds}` : time.seconds}
          </TimerWrapper>
        )}
        <Btn id="ranking" onClick={handleMove}>
          <Img src={ranking_image} alt="ranking_page" />
        </Btn>
        <Btn id="mypage" onClick={handleMove}>
          <Img src={account_image} alt="my_page" />
        </Btn>
      </RightIconWrapper>
    </Wrapper>
  );
};

interface playRoomState {
  isPlayRoom: boolean;
}

const Wrapper = styled.div`
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 50px;
  background: #000000;
  display: flex;
  justify-content: space-even;
  z-index: 3;
  & > * {
    z-index: 4;
  }
`;

const HomeBtnWrapper = styled.div<playRoomState>`
  width: 52%;
  text-align: right;
  align-items: center;
  display: flex;
  justify-content: ${(props) => (props.isPlayRoom ? "space-between" : "end")};
  &: first-child > button {
    margin-left: 20px;
  }
`;

const RightIconWrapper = styled.div`
  width: 48%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
  & > button {
    margin-left: 15px;
  }
`;

const TimerWrapper = styled.div`
  font-size: 20px;
  color: white;
`;

const Btn = styled.button`
  padding: 0px;
  width: 100%;
  border: none;
  background: transparent;
  width: 30px;
  height: 30px;
  align-content: center;
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

const Img = styled.img`
  width: 30px;
  height: 30px;
`;

export default Header;
