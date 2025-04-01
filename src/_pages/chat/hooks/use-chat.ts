import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const event = {
  sendMessage: "sendMessage",
  joinRoom: "joinRoom",
  leaveRoom: "leaveRoom",
};

const listenTo = {
  sendMessage: "newMessage",
  joinRoom: "userJoined",
  leaveRoom: "userLeft",
};

type Message = {
  userId: string;
  text: string;
};

type EventData = {
  userId: string;
  roomId: string;
};

export const useChat = (userId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const socket = io("http://localhost:3000");
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on(listenTo.sendMessage, (message: Message) => {
      console.log(`send Message`, message);
      setMessages((prev) => [...prev, message]);
    });
    socket.on(listenTo.joinRoom, (data: EventData) => {
      console.log(`user ${data.userId} joined room ${data.roomId}`);
    });
    socket.on(listenTo.leaveRoom, (data: EventData) => {
      console.log(`user ${data.userId} left room ${data.roomId}`);
    });

    return () => {
      socket.off(event.sendMessage);
      socket.off(event.joinRoom);
      socket.off(event.leaveRoom);
    };
  }, [socket]);

  const joinRoom = useCallback(
    (roomId: string) => {
      if (!socket) return;
      socket.emit(event.joinRoom, { userId, roomId });
      setCurrentRoom(roomId);
      setMessages([]); // Очищаем сообщения при переходе в новую комнату
    },
    [socket, userId]
  );

  const sendMessage = useCallback(
    (text: string) => {
      console.log(text, socket, currentRoom);

      if (!socket || !currentRoom) return;
      socket.emit(event.sendMessage, { roomId: currentRoom, text });
    },
    [socket, currentRoom]
  );

  const leaveRoom = useCallback(() => {
    if (!socket || !currentRoom) return;
    socket.emit(event.leaveRoom, { roomId: currentRoom });
    setCurrentRoom(null);
  }, [socket, currentRoom]);

  return {
    joinRoom,
    sendMessage,
    leaveRoom,
    messages,
    currentRoom,
  };
};
