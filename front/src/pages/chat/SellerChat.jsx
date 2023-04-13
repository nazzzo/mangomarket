import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { ChatterCard, ChatForm, ChatOption, ChatInput, ChatButton, ChatMenu } from "./styled"
import { useInput } from "../../hooks";
import { Modal } from "../../common/modal"
import { Alert } from '../../common/alert'
import { ChatterMap } from "../../pages/map"
import io from "socket.io-client";
import config from "../../config";
import request from "../../utils/request";
import { ChatMessages } from './';


const ENDPOINT = `${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`;

export const SellerChat = ({ chatter, onClick }) => {
  const { boardid, customer, seller } = chatter
  const { user } = useSelector((state) => state.user)
  const [messages, setMessages] = useState({ isLoading: true, error: null, data: {} })
  const [isActiveButton, setIsActiveButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenAlert, setIsOpenAlert] = useState(false)
  const [isReserved, setIsReserved] = useState()
  const content = useInput("")
  const chatheight = useRef()
  const socket = useRef()

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
    socket.current.emit("sendMessage", { data });
    // const response = await request.post(`/chats`, { data })
    // console.log(response.data)
    content.clear();
  };


  useEffect(() => {
    socket.current = io(ENDPOINT);
    socket.current.emit("joinRoom", { room: `${boardid}-${customer}` });

    socket.current.on("receiveMessage", (newMessage) => {
      try {
        let position
        newMessage.email === user.email ? position = "right" : position = "left"
        newMessage.position = position
        setMessages(messages => ({...messages, isLoading: false, error: null, data: [...messages.data, newMessage]}))
        chatheight.current.scrollTop = chatheight.current.scrollHeight
      } catch (e) {
        setMessages(messages => ({...messages, isLoading: false, error: e.message, data: null}))
      }
    });

    socket.current.on("reserveMessage", (newMessage) => {
      try {
        // const { content, boardid, customer } = newMessage
        // const data = {
        //   content,
        //   boardid,
        //   customer,
        //   seller,
        // }
        if (newMessage.content.indexOf("{", 0) === 0) newMessage.position = "center"
        setMessages((messages) => ({ ...messages, isLoading: false, error: null, data: [...messages.data, newMessage] }))
        chatheight.current.scrollTop = chatheight.current.scrollHeight
      } catch (e) {
        setMessages((messages) => ({ ...messages, isLoading: false, error: null, data: [...messages.data, newMessage] }))
      }})

      socket.current.on("reserveAccept", (newMessage) => {
        try {
          if( newMessage.content === "reserved" ){
            setIsReserved("reserved")
          } else if( newMessage.content === "rejected" ){
            setIsReserved("rejected")
          }
          setMessages((messages) => ({ ...messages, isLoading: false, error: null, data: [...messages.data, newMessage] }))
          chatheight.current.scrollTop = chatheight.current.scrollHeight
        } catch (e) {
          setMessages((messages) => ({ ...messages, isLoading: false, error: null, data: [...messages.data, newMessage] }))
        }
      })

    return () => {
      socket.current.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   // socket.current.emit("reservation", { data: reservation })
    // socket.current.on("reserveMessage", (newMessage) => {
    //   try {
    //     const { content, boardid, customer } = newMessage
    //     const data = {
    //       content,
    //       boardid,
    //       customer,
    //       seller,
    //     }
    //     postReservation(data)
    //     if (newMessage.content.indexOf("{", 0) === 0) newMessage.position = "center"
    //     setMessages((messages) => ({ ...messages, isLoading: false, error: null, data: [...messages.data, newMessage] }))
    //     chatheight.current.scrollTop = chatheight.current.scrollHeight
    //   } catch (e) {
    //     setMessages((messages) => ({ ...messages, isLoading: false, error: null, data: [...messages.data, newMessage] }))
    //   }
  //   })
  // }, [reservation])

  return (
    <>
      <ChatterCard onClick={onClick} chatter={chatter} />
      <ChatMessages setIsReserved={setIsReserved} socket={socket} isReserved={isReserved} messages={messages} setMessages={setMessages} chatter={chatter} chatheight={chatheight} />
      <ChatForm onSubmit={handleSendMessage}>
        {(customer === user.email) && <ChatOption onClick={() => { setIsActiveButton(!isActiveButton) }} className={isActiveButton ? 'on' : ''}>
          <ChatMenu className="chatMenu" onClick={() => { (chatter.state === "reserved") ? setIsOpenAlert(true) : setIsOpen(true) }} />
        </ChatOption>}
        <ChatInput type="text" value={content.value} onChange={content.onChange} placeholder="메세지를 입력해주세요" />
        <ChatButton type="submit" />
      </ChatForm>
      <Alert isOpenAlert={isOpenAlert} onClose={()=> { setIsOpenAlert(false) }} color="red" width="20rem" height="5rem">이미 예약된 상품입니다</Alert>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} height="37rem"><ChatterMap socket={socket} setIsOpen={setIsOpen} boardid={boardid} customer={customer} seller={seller} /></Modal>
    </>
  )}