import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useInput } from "../../hooks";
import io from "socket.io-client";
import config from "../../config";
import request from "../../utils/request";

const ENDPOINT = `${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`;
let socket;

export const CustomerChat = ({ seller, customer, boardid }) => {
  const [ logs, setLogs ] = useState([]);
  const [ chats, setChats ] = useState([]);
  const content = useInput("");

  useEffect(() => {
    const getCustomerChat = async () => {
      const response = await request.get(`/chats?customer=${customer.email}&opponent=${seller.email}&boardid=${boardid}`);
      if (!response.data.isError) setLogs(response.data);
    };
    getCustomerChat();
  }, [])

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("joinRoom", { room: `${boardid}-${customer.email}`});

    socket.on("receiveMessage", (newMessage) => {
      console.log(newMessage)
      setChats([...chats, newMessage]);
    });

    //{boardid: '5', seller: 'seller@naver.com', customer: 'customer@naver.com', content: 'hi', type: 'sender'}

    return () => {
      socket.disconnect();
    };
  }, [chats]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    let data = {
      boardid: boardid,
      seller: seller.email,
      customer: customer.email,
      content: content.value,
      email: customer.email,
    }
    socket.emit("sendMessage", { data });
    const response = await request.post(`/chats`, { data })
    if (response.status === 201) content.clear()
    content.clear();
  };

  return (
    <>
      <div>
        {logs ? (
          <ul>
            {logs.map((v) => (
              <div key={v.id}>
                <li>{v.email}</li>
                <li>{v.content}</li>
              </div>
            ))}
          </ul>
        ) : (
          <></>
        )}
        {chats ? (
          <ul>
            {chats.map((v, idx) => (
              <div key={idx}>
                <li>{v.email}</li>
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
