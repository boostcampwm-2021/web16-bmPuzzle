import React, { useState, useEffect } from "react";
const Chat = (props: any) => {
  const { socket, roomID } = props;
  interface MessageInfo {
    name: string;
    message: string;
  }
  const [state, setState] = useState({ name: "", message: "" });
  const [chat, setChat] = useState<MessageInfo[]>([]);

  useEffect(() => {
    socket.on("message", (msg: { name: string; message: string }) => {
      const newMsg = { name: msg.name, message: msg.message };
      setChat([...chat, newMsg]);
    });
  });
  const onMessageSubmit = (e: any) => {
    e.preventDefault();
    socket.emit("message", { roomID: roomID, message: state });
    setState({ name: "", message: "" });
  };
  const onTextChange = (e: any) => {
    setState({ name: roomID, message: e.target.value });
  };
  const renderChat = () => {
    return chat.map((msg: { name: string; message: string }) => (
      <div>
        <h3>
          {msg.name}:<span>{msg.message}</span>
        </h3>
      </div>
    ));
  };

  socket.on("message", (res: any) => console.log(res));

  return (
    <div id="chat">
      <div>{renderChat()}</div>
      <form onSubmit={onMessageSubmit}>
        <input
          type="text"
          name="message"
          onChange={(e) => onTextChange(e)}
          value={state.message}
        />
        <button>전송</button>
      </form>
    </div>
  );
};

export default Chat;
