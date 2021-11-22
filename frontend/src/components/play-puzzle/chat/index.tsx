import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { SocketContext } from "@context/socket";

const Chat = (props: any) => {
  const { roomID, chatVisible } = props;
  const socket = useContext(SocketContext);
  interface MessageInfo {
    name: string;
    message: string;
  }
  const [state, setState] = useState<{ name: string | null; message: string }>({
    name: "",
    message: "",
  });
  const [chat, setChat] = useState<MessageInfo[]>([]);
  const userID = window.sessionStorage.getItem("id");

  useEffect(() => {
    socket.on("message", (msg: { name: string; message: string }) => {
      const newMsg = { name: msg.name, message: msg.message };
      setChat([...chat, newMsg]);
      document.querySelector(".chatLog")?.scrollBy({
        top: document.querySelector(".chatLog")?.scrollHeight,
        behavior: "smooth",
      });
    });
    return () => {
      socket.off("message");
    };
  }, [chat, socket]);

  const onMessageSubmit = (e: any) => {
    e.preventDefault();
    socket.emit("message", { roomID: roomID, message: state });
    setState({ name: "", message: "" });
  };
  const onTextChange = (e: any) => {
    setState({ name: userID, message: e.target.value });
  };
  const renderChat = () => {
    return chat.map((msg: { name: string; message: string }, index: number) => (
      <DialogUnit key={index}>
        <Sender>{msg.name}</Sender>
        <Message>{msg.message}</Message>
      </DialogUnit>
    ));
  };

  return (
    <ChatWrapper chatVisible={chatVisible}>
      <ChatBar>Chat</ChatBar>
      <ChatLog>{renderChat()}</ChatLog>
      <ChatForm onSubmit={onMessageSubmit}>
        <ChatInput
          type="text"
          name="message"
          placeholder="채팅을 입력하세요"
          onChange={(e) => onTextChange(e)}
          value={state.message}
        />
      </ChatForm>
    </ChatWrapper>
  );
};

interface chatState {
  chatVisible: boolean;
}
const ChatWrapper = styled.div<chatState>`
  position: absolute;
  width: 23%;
  max-width: 700px;
  height: calc(100% - 53px);
  display: ${(props) => (props.chatVisible ? "flex" : "none")};
  flex-direction: column;
  border: 1px solid #f6f3f9;
  background-color: white;
`;
const ChatBar = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  justify-content: center;
  font-size: 25px;
`;
const ChatLog = styled.div.attrs({ className: "chatLog" })`
  width: 100%;
  height: calc(100% - 110px);
  overflow-y: auto;
  margin-bottom: 10px;
`;

const ChatForm = styled.form`
  display: flex;
  width: 100%;
  height: 50px;
`;
const ChatInput = styled.input`
  background-color: #f6f3f9;
  width: 100%;
  padding: 5%;
`;
const DialogUnit = styled.div`
  width: calc(90% - 20px);
  height: fit-content;
  margin: 10px;
  background-color: #f6f3f9;
  border-radius: 10px;
  padding: 5%;
`;

const Sender = styled.div`
  height: 20px;
  font-size: 14px;
  color: rgba(100, 100, 100);
`;

const Message = styled.div`
  font-size: 12px;
  font-weight: 400;
`;

export default Chat;
