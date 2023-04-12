import { useEffect, useState, useCallback, useMemo, memo, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { userSetReservation } from "../../store"
import { useInput } from "../../hooks"
import { Modal } from "../../common/modal"
import { ChatterMap, MapMessage } from "../../pages/map"
import { ChatForm, ChatInput, ChatButton, ChatOption, ChatMenu, ChatLogWrap, ChatLogs, LiveChats, LeftMessageWrap, RightMessageWrap, CenterMessageWrap, ChatUserImg, ChatMessage, ChatTime } from "./styled"
import request from "../../utils/request"
import io from "socket.io-client"
import config from "../../config"

const ENDPOINT = `${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`;
let socket

export const SellerChat = ({ seller, customer, boardid, chatter, isSeller }) => {
  const [logs, setLogs] = useState([])
  const [chats, setChats] = useState([])
  const [ isOpen, setIsOpen ] = useState(false)
  const [ isReserved, setIsReserved ] = useState(false)
  const [isActiveButton, setIsActiveButton] = useState(false);
  const { user, reservation } = useSelector((state) => state.user)
  const content = useInput("")
  const chatheight = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    const getSellerChat = async () => {
      const { data } = await request.get(`/chats?seller=${seller}&opponent=${customer}&boardid=${boardid}`)
      const messageList = data.map((v) => {
        let position
        v.email === user.email ? position = "right" : position = "left"
        if (!v.email && v.content.indexOf("{",0)===0) position = "center"
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


  useEffect(()=> {
    socket.emit("reservation", { data: reservation })
    setIsReserved(false)
    dispatch(userSetReservation({}))

    const postReservation = async ( data ) => {
      await request.post(`/chats`, { data })
    }

    socket.on("reserveMessage", (newMessage) => {
      const { content, boardid, customer } = newMessage 
      const data = {
        content,
        boardid,
        customer,
        seller,
      }
      postReservation(data)
      if (newMessage.content.indexOf("{",0)===0) newMessage.position = "center"
    setChats([...chats, newMessage])
    chatheight.current.scrollTop = chatheight.current.scrollHeight
    })
  }, [isReserved])

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
    if (response.status === 201) content.clear()
  }

  return (
    <>
      <ChatLogWrap ref={chatheight}>
        {logs ? (
          <ChatLogs>
            {logs.map((v) => {
            switch(v.position) {
                case "center":
                  const { address, lat, lng, time } = JSON.parse(v.content)
                return (<CenterMessageWrap key={v.id}>
                            <MapMessage address={address} lat={lat} lng={lng} time={time} chatid={v.id} boardid={boardid} customer={customer} seller={seller} />
                        </CenterMessageWrap>);
                case "left":
                return (
                    <LeftMessageWrap key={v.id}>
                    <ChatUserImg src={chatter.userImg} />
                    <ChatMessage color="yellow" content={v.content} />
                    <ChatTime date={v.createdAt} />
                    </LeftMessageWrap>
                );
                case "right":
                return (
                    <RightMessageWrap key={v.id}>
                    <ChatTime date={v.createdAt} />
                    <ChatMessage color="green" content={v.content} />
                    </RightMessageWrap>
                );
            }
            })}
          </ChatLogs>
        ) : (
          <></>
        )}
        {chats ? (
          <LiveChats>
            {chats.map((v, idx) => {
            switch(v.position) {
                case "center":
                  const { address, lat, lng, time } = JSON.parse(v.content)
                return (<CenterMessageWrap key={v.id}>
                            <MapMessage address={address} lat={lat} lng={lng} time={time} chatid={v.id} boardid={boardid} customer={customer} seller={seller} />
                        </CenterMessageWrap>);
                case "left":
                return (
                    <LeftMessageWrap key={v.id}>
                    <ChatUserImg src={chatter.userImg} />
                    <ChatMessage color="yellow" content={v.content} />
                    <ChatTime date={v.createdAt} />
                    </LeftMessageWrap>
                );
                case "right":
                return (
                    <RightMessageWrap key={v.id}>
                    <ChatTime date={v.createdAt} />
                    <ChatMessage color="green" content={v.content} />
                    </RightMessageWrap>
                );
            }
            })}
          </LiveChats>
        ) : (
          <></>
        )}
      </ChatLogWrap>
      <ChatForm onSubmit={handleSendMessage}>
        {isSeller && <ChatOption onClick={() => { setIsActiveButton(!isActiveButton) }} className={isActiveButton ? 'on' : ''}>
          <ChatMenu className="chatMenu" onClick={() => {setIsOpen(true)}} />
        </ChatOption>}
        <ChatInput type="text" value={content.value} onChange={content.onChange} placeholder="메세지를 입력해주세요" />
        <ChatButton type="submit" />
      </ChatForm>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} height="37rem">
            <ChatterMap setIsOpen={setIsOpen} setIsReserved={setIsReserved} boardid={boardid} customer={customer} />
      </Modal>
    </>
  )
}
