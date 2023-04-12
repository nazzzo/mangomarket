import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ChatterCard, ChatForm, ChatOption, ChatInput, ChatButton, ChatMenu, ChatLogWrap, ChatLogs, LiveChats, LeftMessageWrap, RightMessageWrap, CenterMessageWrap, ChatUserImg, ChatMessage, ChatTime } from "./styled"
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
  const [seller, setSeller] = useState({
    isLoading: true,
    error: null,
    data: {}
  })
  const [messages, setMessages] = useState({
    isLoading: true,
    error: null,
    data: {}
  })
  const [isActiveButton, setIsActiveButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const { user: customer, reservation } = useSelector((state) => state.user)
  const content = useInput("")
  const chatheight = useRef()

  console.log(`seller:::`, seller)


  const getSellerData = async () => {
    try {
      const { data } = await request.get(`boards/view/${boardid}`);
      setSeller({ ...seller, isLoading: false, error: null, data })
    } catch (e) {
      setSeller({ ...seller, isLoading: false, error: e.message, data: null })
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
      seller: seller.data.email,
      customer: customer.email,
      content: content.value,
      email: customer.email,
      username: customer.username,
      userImg: customer.userImg,
      address: customer.address,
    }
    socket.emit("sendMessage", { data });
    const response = await request.post(`/chats`, { data })
    content.clear();
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("joinRoom", { room: `${boardid}-${customer.email}` });

    socket.on("receiveMessage", (newMessage) => {
      try {
        let position
        newMessage.email === customer.email ? position = "right" : position = "left"
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
          seller: seller.data.email,
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
    getSellerData()
  }, [])


  if (seller.isLoading) return <>Loading...</>
  if (seller.error) return <>{seller.error}</>
  return (
    <>
      <ChatterCard onClick={() => { }} chatter={seller.data}></ChatterCard>
      <ChatMessages messages={messages} setMessages={setMessages} seller={seller.data} customer={customer} chatheight={chatheight} />
      <ChatForm onSubmit={handleSendMessage}>
        <ChatOption onClick={() => { setIsActiveButton(!isActiveButton) }} className={isActiveButton ? 'on' : ''}>
          <ChatMenu className="chatMenu" onClick={() => { setIsOpen(true) }} />
        </ChatOption>
        <ChatInput type="text" value={content.value} onChange={content.onChange} placeholder="메세지를 입력해주세요" />
        <ChatButton type="submit" />
      </ChatForm>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} height="37rem">
        <ChatterMap setIsOpen={setIsOpen} boardid={boardid} customer={customer.email} />
      </Modal>
    </>
  )}