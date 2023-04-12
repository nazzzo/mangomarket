import { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";
import { useInput } from "../../hooks"
import { Modal } from "../../common/modal"
import { ChatterMap } from "../../pages/map"
import { ChatForm, ChatInput, ChatButton, ChatOption, ChatMenu } from "./styled"
import request from "../../utils/request"
import io from "socket.io-client"
import config from "../../config"
import { ChatMessages } from './';

const ENDPOINT = `${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`;
let socket

export const GlobalChat = ({ chatter }) => {
  const { seller, boardid } = chatter
  const [messages, setMessages] = useState({
    isLoading: true,
    error: null,
    data: {}
  })
  const [ isOpen, setIsOpen ] = useState(false)
  const [isActiveButton, setIsActiveButton] = useState(false);
  const { user, reservation } = useSelector((state) => state.user)
  const content = useInput("")
  const chatheight = useRef()
  let customer;
  if (user.email !== chatter.seller) customer = user

  // const getSellerData = async () => {
  //   try {
  //     const { data } = await request.get(`boards/view/${boardid}`);
  //     setSeller({ ...seller, isLoading: false, error: null, data })
  //   } catch (e) {
  //     setSeller({ ...seller, isLoading: false, error: e.message, data: null })
  //   }
  // };

  const postReservation = async (data) => {
    try {
      await request.post(`/chats`, { data })
    } catch (e) {
      console.log(e)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    let email
    seller === user.email ? email = seller : email = customer.email

    let data = {
      boardid,
      seller,
      customer: customer.email,
      content: content.value,
      email,
      username: user.username,
      userImg: user.userImg,
      address: user.address,
    }
    socket.emit("sendMessage", { data })
    const response = await request.post(`/chats`, { data })
    content.clear()
  }

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
          seller
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


  return (
    <>
      <ChatMessages messages={messages} setMessages={setMessages} seller={chatter} customer={customer} chatheight={chatheight} />
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
  )
}