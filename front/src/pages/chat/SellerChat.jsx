import { useEffect, useState, useCallback, useMemo, memo, useRef } from 'react';
import { useSelector } from "react-redux";
import { useInput } from "../../hooks"
import { ChatForm, ChatInput, ChatButton, ChatOption, ChatMenu, ChatLogWrap, ChatLogs, LiveChats, LeftMessageWrap, RightMessageWrap, ChatUserImg, ChatMessage, ChatTime } from "./styled"
import request from "../../utils/request"
import io from "socket.io-client"
import config from "../../config"

const ENDPOINT = `${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`;
let socket

export const SellerChat = ({ seller, customer, boardid, chatter }) => {
  const [logs, setLogs] = useState([])
  const [chats, setChats] = useState([])
  const [isActiveButton, setIsActiveButton] = useState(false);
  const { user } = useSelector((state) => state.user)
  const content = useInput("")
  const chatheight = useRef()

  useEffect(() => {
    const getSellerChat = async () => {
      const { data } = await request.get(`/chats?seller=${seller}&opponent=${customer}&boardid=${boardid}`)
      const messageList = data.map((v) => {
        let position
        v.email === user.email ? position = "right" : position = "left"
        v.position = position
        return v
      })

      if (!data.isError) setLogs(messageList);
    }
    getSellerChat()
    chatheight.current.scrollTop = chatheight.current.scrollHeight
  }, [])

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("joinRoom", { room: `${boardid}-${customer}` });

    socket.on("receiveMessage", (newMessage) => {
      let position
      newMessage.email === user.email ? position = "right" : position = "left"
      newMessage.position = position
      setChats([...chats, newMessage]);
      chatheight.current.scrollTop = chatheight.current.scrollHeight
    });

    return () => {
      socket.disconnect();
    };
  }, [chats]);

  const handleSendMessage = async (e) => {
    e.preventDefault()
    let email

    seller === user.email ? email = seller : email = customer

    let data = {
      boardid,
      customer,
      seller,
      content: content.value,
      email,
      username: user.username,
      userImg: user.userImg,
      address: user.address,
    }
    socket.emit("sendMessage", { data })
    const response = await request.post(`/chats`, { data })
    console.log(response.data)
    if (response.status === 201) content.clear()
  }

  return (
    <>
      <ChatLogWrap ref={chatheight}>
        {logs ? (
          <ChatLogs>
            {logs.map((v) => (
              v.position === "left" ? (
                <LeftMessageWrap key={v.id}>
                  <ChatUserImg src={chatter.userImg} />
                  <ChatMessage color="yellow" content={v.content} />
                  <ChatTime date={v.createdAt} />
                </LeftMessageWrap>
              ) : (
                <RightMessageWrap>
                  <ChatTime date={v.createdAt} />
                  <ChatMessage color="green" content={v.content} />
                </RightMessageWrap>
              )
            ))}
          </ChatLogs>
        ) : (
          <></>
        )}
        {chats ? (
          <LiveChats>
            {chats.map((v, idx) => (
              v.position === "left" ? (
                <LeftMessageWrap key={v.id}>
                  <ChatUserImg src={chatter.userImg} />
                  <ChatMessage color="yellow" content={v.content} />
                  <ChatTime date={v.createdAt} />
                </LeftMessageWrap>
              ) : (
                <RightMessageWrap>
                  <ChatTime date={v.createdAt} />
                  <ChatMessage color="green" content={v.content} />
                </RightMessageWrap>
              )
            ))}
          </LiveChats>
        ) : (
          <></>
        )}
      </ChatLogWrap>
      <ChatForm onSubmit={handleSendMessage}>
        <ChatOption onClick={() => { setIsActiveButton(!isActiveButton) }} className={isActiveButton ? 'on' : ''}>
          <ChatMenu className="chatMenu" onClick={() => { }} />
        </ChatOption>
        <ChatInput type="text" value={content.value} onChange={content.onChange} placeholder="메세지를 입력해주세요" />
        <ChatButton type="submit" />
      </ChatForm>
    </>
  )
}
