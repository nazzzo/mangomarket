import { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import { useInput } from "../../hooks"
import io from "socket.io-client"
import config from "../../config"
import request from '../../utils/request'

const EndPoint = `${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`;
let socket;

export const Chat = ({ seller, customer, boardId }) => {
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [ a, setA ] = useState([])
  const content = useInput("")

  useEffect(() => {
    const getCustomerChat = async () => {
      const response = await request.get(`/chats?seller=asdf1387@t.com`)
      console.log(response.data)
      if( !response.data.isError ) setMessages(response.data)
    }
    getCustomerChat()
  }, [])

  useEffect(() => {
    socket = io(EndPoint);
    socket.emit("joinRoom", { boardId, customer: customer.email, seller: seller.email, username: user.username });

    socket.on("receiveMessage", (newMessage) => {
      // setMessages([...messages, newMessage]);
      console.log(newMessage)
      setA([...a, newMessage.message])
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]);



  const handleSendMessage = (e) => {
    e.preventDefault();
    socket.emit("sendMessage", {
      boardId: boardId,
      seller: seller.email,
      customer: customer.email,
      message: content.value,
      type: user.email === seller.email ? "receiver" : "sender",
    });
    content.clear()
  };

  return (
    <>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.customer}: {msg.content}
          </div>
        ))}
        {a.map((msg, index) => (
          <div key={index}>
            {msg.customer}: {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={content.value}
          onChange={content.onChange}
        />
        <button type="submit">전송</button>
      </form>
    </>
  );
};
