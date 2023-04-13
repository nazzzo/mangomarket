import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ChatterCard, ChatForm, ChatOption, ChatInput, ChatButton, ChatMenu } from "./styled"
import { useInput } from "../../hooks";
import { Modal } from "../../common/modal"
import { ChatterMap } from "../../pages/map"
import io from "socket.io-client";
import config from "../../config";
import request from "../../utils/request";
import { ChatMessages } from './';


const ENDPOINT = `${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`;
let socket;

export const CustomerChat = ({ boardid }) => {
  const [chatter, setChatter] = useState({ isLoading: true, error: null, data: {} })
  const {customer, seller} = chatter.data
  const { user, reservation } = useSelector((state) => state.user)
  const [messages, setMessages] = useState({ isLoading: true, error: null, data: {} })
  const [isActiveButton, setIsActiveButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const content = useInput("")
  const chatheight = useRef()

  const getChatter = async () => {
    try {
      const { data } = await request.get(`chats/${boardid}?customer=${user.email}`);
      setChatter({ ...chatter, isLoading: false, error: null, data })
    } catch (e) {
      setChatter({ ...chatter, isLoading: false, error: e.message, data: null })
    }
  };

  const postReservation = async (data) => {
    try {
      await request.post(`/chats`, { data })
    } catch (e) {
      console.log(e)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    let data = {
      boardid,
      seller,
      customer,
      content: content.value,
      email: user.email,
      username: user.username,
      userImg: user.userImg,
      address: user.address,
    }
    socket.emit("sendMessage", { data });
    const response = await request.post(`/chats`, { data })
    content.clear();
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("joinRoom", { room: `${boardid}-${customer}` });

    socket.on("receiveMessage", (newMessage) => {
      try {
        let position
        newMessage.email === user.email ? position = "right" : position = "left"
        newMessage.position = position
        setMessages({ ...messages, isLoading: false, error: null, data: [...messages.data, newMessage] })
        chatheight.current.scrollTop = chatheight.current.scrollHeight
      } catch (e) {
        setMessages({ ...messages, isLoading: false, error: e.message, data: null })
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  useEffect(() => {
    socket.emit("reservation", { data: reservation })
    socket.on("reserveMessage", (newMessage) => {
      try {
        const { content, boardid, customer } = newMessage
        const data = {
          content,
          boardid,
          customer,
          seller,
        }
        postReservation(data)
        if (newMessage.content.indexOf("{", 0) === 0) newMessage.position = "center"
        setMessages({ ...messages, isLoading: false, error: null, data: [...messages.data, newMessage] })
        chatheight.current.scrollTop = chatheight.current.scrollHeight
      } catch (e) {
        setMessages({ ...messages, isLoading: false, error: e.message, data: null})
      }
    })
  }, [reservation])

  useEffect(() => {
    getChatter()
  }, [])

  if (chatter.isLoading) return <>Loading...</>
  if (chatter.error) return <>{chatter.error}</>
  return (
    <>
      <ChatterCard chatter={chatter.data} />
      <ChatMessages messages={messages} setMessages={setMessages} chatter={chatter.data} chatheight={chatheight} />
      <ChatForm onSubmit={handleSendMessage}>
        {(customer === user.email) && <ChatOption onClick={() => { setIsActiveButton(!isActiveButton) }} className={isActiveButton ? 'on' : ''}>
          <ChatMenu className="chatMenu" onClick={() => { setIsOpen(true) }} />
        </ChatOption>}
        <ChatInput type="text" value={content.value} onChange={content.onChange} placeholder="메세지를 입력해주세요" />
        <ChatButton type="submit" />
      </ChatForm>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} height="37rem">
        <ChatterMap setIsOpen={setIsOpen} boardid={boardid} customer={customer} />
      </Modal>
    </>
  )}