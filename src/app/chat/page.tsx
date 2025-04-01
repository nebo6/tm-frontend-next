import { Chat } from "@/_pages/chat/ui";
import React from "react";

const ChatPage: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>React Chat with NestJS</h1>
      <Chat />
    </div>
  );
};

export default ChatPage;
