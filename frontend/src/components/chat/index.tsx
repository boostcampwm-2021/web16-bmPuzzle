import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { SocketContext } from "@src/context/socket";

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
    });
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
    return chat.map((msg: { name: string; message: string }) => (
      <DialogUnit>
        <div className="sender">{msg.name}</div>
        <div className="message">{msg.message}</div>
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
  height: calc(100% - 37px);
  display: ${(props) => (props.chatVisible ? "block" : "none")};
  border: 1px solid #f6f3f9;
  background-color: white;
`;
const ChatBar = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`;
const ChatLog = styled.div`
  width: 100%;
  height: calc(100% - 190px);
  overflow-y: auto;
`;

const ChatForm = styled.form`
  display: flex;
  width: 100%;
  height: 120px;
`;
const ChatInput = styled.input`
  background-color: #f6f3f9;
  width: 100%;
`;
const DialogUnit = styled.div`
  width: calc(100% - 20px);
  min-height: 80px;
  height: fit-content;
  margin: 10px;
  background-color: #f6f3f9;
  border-radius: 10px;
  > .sender {
    height: 20px;
    color: rgba(100, 100, 100);
  }
  > .message {
    font-size: 20px;
    font-weight: 400;
  }
`;

export default Chat;
