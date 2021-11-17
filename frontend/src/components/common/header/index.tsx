import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import logo_image from "@images/puzzle-icon.png";
import ranking_image from "@images/ranking-icon.png";
import account_image from "@images/account-icon.png";
import chat_image from "@images/chat-icon.png";

const Header = (props: any) => {
  const history = useHistory();
  const ref: any = useRef(null);
  const { isPlayRoom, chatVisible, setChatVisible, time, setTime } = props;
  const handleMove = (e: any) => {
    const url =
      e.target.id === "" ? e.target.closest("button").id : e.target.id;
    history.push(`/${url}`);
  };
  const toggleChat = (e: any) => {
    const toggle = chatVisible === true ? false : true;
    setChatVisible(toggle);
  };

  useEffect(() => {
    if (time !== undefined) {
      const countTime = setInterval(() => {
        if (time.seconds >= 60) {
          setTime({ minutes: time.minutes + 1, seconds: 0 });
        } else {
          setTime({ minutes: time.minutes, seconds: time.seconds + 1 });
        }
      }, 1000);
      return () => clearInterval(countTime);
    }
  }, [setTime, time]);

  return (
    <Wrapper>
      {isPlayRoom && (
        <ChatWrapper>
          <Btn id="chat" onClick={toggleChat}>
            <Img src={chat_image} alt="chat" />
          </Btn>
        </ChatWrapper>
      )}
      <HomeBtnWrapper>
        <Btn id="main" onClick={handleMove}>
          <Img src={logo_image} alt="logo" />
        </Btn>
      </HomeBtnWrapper>
      <RightIconWrapper>
        {isPlayRoom && (
          <TimerWrapper ref={ref}>
            {time.minutes}:
            {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
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

const Wrapper = styled.div`
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 30px;
  padding-top: 5px;
  background: #000000;
  display: flex;
  justify-content: space-even;
`;

const HomeBtnWrapper = styled.div`
  width: 50%;
  text-align: right;
`;

const RightIconWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 20px;
  & > button {
    margin-left: 5px;
  }
`;

const ChatWrapper = styled.div`
  position: absolute;
`;

const TimerWrapper = styled.div`
  color: white;
`;

const Btn = styled.button`
  padding: 0px;
  width: 50%;
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
  width: 20px;
  height: 20px;
`;

export default Header;
