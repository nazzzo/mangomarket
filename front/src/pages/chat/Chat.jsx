import { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import { useInput } from "../../hooks"
import io from "socket.io-client"
import config from "../../config";

const EndPoint = `${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`;
let socket;

export const Chat = ({ seller, customer, boardId }) => {
    const [messages, setMessages] = useState([]);
    const { user } = useSelector((state) => state.user);
    const content = useInput("")

  
    // console.log(`seller:::`, seller, `customer:::`, customer, `boardId:::`, boardId)
    useEffect(() => {
        socket = io(EndPoint);
        socket.emit("joinRoom", { boardId, customer: customer.email, seller: seller.email });
  
        socket.on("receiveMessage", (newMessage) => {
            setMessages([...messages, newMessage]);
        });    
    
        return () => {
        socket.off();
        };
    }, []);
  


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
                {msg.customer}: {msg.message}
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
