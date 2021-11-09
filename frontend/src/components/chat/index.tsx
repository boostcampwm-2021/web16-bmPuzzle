import React, { useState, useEffect } from "react";

const Chat = (props: any) => {
  const { socket } = props;
  const [state, setState] = useState({ name: "", message: "" });

  const onMessageSubmit = (e: any) => {
    e.preventDefault();
    socket.emit("message", state);
    setState({ name: "", message: "" });
  };
  const onTextChange = (e: any) => {
    setState({ name: "jaeyeong", message: e.target.value });
  };

  return (
    <div id="chat">
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
