import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ChatterCard, CustomerChatWrap, ChatForm, ChatOption, ChatInput, ChatButton, ChatMenu } from "./styled"
import { useInput } from "../../hooks";
import io from "socket.io-client";
import config from "../../config";
import request from "../../utils/request";

const ENDPOINT = `${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`;
let socket;

export const CustomerChat = ({ seller, customer, boardid, chatter, width, height }) => {
  const [ logs, setLogs ] = useState([]);
  const [ chats, setChats ] = useState([]);
  const [isActiveButton, setIsActiveButton] = useState(false);
  const { user } = useSelector((state) => state.user)
  const content = useInput("");

  useEffect(() => {
    const getCustomerChat = async () => {
      const { data } = await request.get(`/chats?customer=${customer.email}&opponent=${seller.email}&boardid=${boardid}`);
      const messageList = data.map((v) => {
        let position
        v.email === user.email ? position = "right" : position = "left"
        v.position = position
        return v
      })

      if (!data.isError) setLogs(messageList);
    };
    getCustomerChat();
  }, [])

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("joinRoom", { room: `${boardid}-${customer.email}`});

    socket.on("receiveMessage", (newMessage) => {
      let position
      newMessage.email === user.email ? position = "right" : position = "left"
      newMessage.position = position
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
      username: customer.username,
      userImg: customer.userImg,
      address: customer.address,
    }
    socket.emit("sendMessage", { data });
    const response = await request.post(`/chats`, { data })
    if (response.status === 201) content.clear()
    content.clear();
  };

  

  return (
      <CustomerChatWrap width={width} height={height}>
        <ChatterCard onClick={()=>{}} chatter={chatter}></ChatterCard>
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
                  <h3>{v.username}</h3>
                  {/* <img src={v.userImg}/> */}
                  <li>{v.address}</li>
                  <li>{v.content}</li>
                </div>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div>
        <ChatForm onSubmit={handleSendMessage}>
                <ChatOption onClick={()=>{setIsActiveButton(!isActiveButton)}} className={isActiveButton ? 'on' : ''}>
                  <ChatMenu className="chatMenu" onClick={()=>{}} />
                </ChatOption>  
                <ChatInput type="text" value={content.value} onChange={content.onChange} placeholder="메세지를 입력해주세요" />
                <ChatButton type="submit" />
        </ChatForm>
      </CustomerChatWrap>
  );
};
