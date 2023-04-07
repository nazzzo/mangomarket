import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import config from "../config";

export const useChat = ({ seller, user, boardId, setMessages }) => {
  const [namespace, setNamespace] = useState(null);
  const [room, setRoom ] = useState([])
  const socketRef = useRef();

  useEffect(() => {
    const initialSocket = io(`${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`);

    initialSocket.emit("init", { 
        namespace: boardId, 
        room: user.email, 
    });
    initialSocket.on("namespace", ({ namespace }) => {
        setNamespace(namespace);        
    });
  }, []);

  const nameSoket = io(`${config.PT}://${config.HOST}:${config.BACKEND_PORT}/${namespace}`)

  console.log(room)

  const sendMessage = (messageBody) => {
    const message = {
      content: messageBody,
      sender: user.email,
      seller: seller.email,
      type: user.email === seller.email ? "receiver" : "sender",
    };

    socketRef.current.emit("message", message);

    setMessages((prevMessages) => {
      console.log(prevMessages);
      return [...prevMessages, message];
    });
  };

  return { sendMessage };
};
