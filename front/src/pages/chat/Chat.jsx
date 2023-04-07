import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useInput } from "../../hooks";
import io from "socket.io-client";
import config from "../../config";
import request from "../../utils/request";

const EndPoint = `${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`;
let socket;

export const Chat = ({ seller, customer, boardId }) => {
  const [logs, setLogs] = useState([]);
  const [chats, setChats] = useState([]);
  const { user } = useSelector((state) => state.user);

  const content = useInput("");

  useEffect(() => {
    const getCustomerChat = async () => {
      const response = await request.get(`/chats?customer=${customer.email}`);
      console.log(response.data);
      if (!response.data.isError) setLogs(response.data);
    };
    getCustomerChat();
  }, []);

  useEffect(() => {
    socket = io(EndPoint);
    socket.emit("joinRoom", {
      boardId,
      customer: customer.email,
      seller: seller.email,
      username: user.username,
    });

    socket.on("receiveMessage", (newMessage) => {
      // setMessages([...messages, newMessage]);
      setChats([...chats, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, [chats]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", {
      boardId: boardId,
      seller: seller.email,
      customer: customer.email,
      message: content.value,
      type: user.email === seller.email ? "receiver" : "sender",
    });
    content.clear();
  };

  return (
    <>
      <div>
        {logs ? (
          <ul>
            {logs.map((v) => (
              <div>
                <li>{v.content}</li>
              </div>
            ))}
          </ul>
        ) : (
          <></>
        )}
        {chats ? (
          <ul>
            {chats.map((v, index) => (
              <div>
                <li>{v.content}</li>
              </div>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </div>
      <form onSubmit={handleSendMessage}>
        <input type="text" value={content.value} onChange={content.onChange} />
        <button type="submit">전송</button>
      </form>
    </>
  );
};
