"use client";
import React, { useState } from "react";
import { useChat } from "../hooks";

const randomUserId = `user_${Math.random().toString(36).substring(2, 5)}`;

export const Chat: React.FC = () => {
  const { messages, currentRoom, joinRoom, sendMessage, leaveRoom } =
    useChat(randomUserId);

  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    sendMessage(messageText);
    setMessageText("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Chat Room: {currentRoom || "Not selected"}</h2>

      {!currentRoom ? (
        <div>
          <button
            onClick={() => joinRoom("room1")}
            style={{ marginRight: "10px" }}
          >
            Join Room 1
          </button>
          <button onClick={() => joinRoom("room2")}>Join Room 2</button>
        </div>
      ) : (
        <div>
          <div
            style={{
              height: "300px",
              border: "1px solid #ccc",
              overflowY: "auto",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            {messages.map((msg, index) => (
              <div key={index} style={{ marginBottom: "5px" }}>
                <strong>{msg.userId}:</strong> {msg.text}
              </div>
            ))}
          </div>

          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            style={{ width: "70%", padding: "8px", marginRight: "10px" }}
            className="border"
          />
          <button onClick={handleSendMessage} style={{ padding: "8px" }}>
            Send
          </button>
          <button
            onClick={leaveRoom}
            style={{
              padding: "8px",
              marginLeft: "10px",
              background: "#ff6b6b",
            }}
          >
            Leave Room
          </button>
        </div>
      )}
    </div>
  );
};
