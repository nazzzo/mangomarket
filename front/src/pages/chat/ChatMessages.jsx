import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import request from '../../utils/request'
import { ChatLogWrap, ChatLogs, LeftMessageWrap, RightMessageWrap, CenterMessageWrap, ChatUserImg, ChatMessage, ChatTime } from "./styled"
import { MapMessage } from "../../pages/map"

export const ChatMessages = ({ setChatState, chatState, socket, messages, setMessages, chatter, chatheight }) => {    
    const { boardid, seller, customer, userImg } = chatter
    const { user } = useSelector((state) => state.user)

    const getCustomerChat = async () => {
        try {
            const { data } = await request.get(`/chats?customer=${customer}&seller=${seller}&email=${user.email}&boardid=${boardid}`);
            console.log(data)
            let messageList = [];
            if (data.length) {
                messageList = data.map((v) => {
                    let position
                    v.email === user.email ? position = "right" : position = "left"
                    if (!v.email && v.content.indexOf("{", 0) === 0) position = "center"
                    v.position = position
                    return v
                })
            }
            setMessages({ isLoading: false, error: null, data: messageList })
        } catch (e) {
            setMessages({ isLoading: false, error: e.message, data: null })
        }
    };
    useEffect(() => {
        getCustomerChat()
    }, [])

    if (messages.isLoading) return <>Loading...</>
    if (messages.error) return <>{messages.error}</>

    return (
        <ChatLogWrap ref={chatheight}>
            <ChatLogs>
                {messages.data.map((v) => {
                    switch (v.position) {
                        case "center":
                            setChatState(v.state)
                            const { address, lat, lng, time } = JSON.parse(v.content)
                            return (<CenterMessageWrap key={v.id}>
                                <MapMessage seller={seller} socket={socket} chatState={chatState} address={address} lat={lat} lng={lng} time={time} chatid={v.id} boardid={boardid} customer={customer} />
                            </CenterMessageWrap>);
                        case "left":
                            return (
                                <LeftMessageWrap key={v.id}>
                                    <ChatUserImg src={userImg} />
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
        </ChatLogWrap>
    )
}