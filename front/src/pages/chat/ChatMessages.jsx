import { useEffect, useState } from "react"
import request from '../../utils/request'
import { ChatLogWrap, ChatLogs, LeftMessageWrap, RightMessageWrap, CenterMessageWrap, ChatUserImg, ChatMessage, ChatTime } from "./styled"
import { MapMessage } from "../../pages/map"

export const ChatMessages = ({ messages, setMessages, seller, customer, chatheight }) => {
    const { id, email: sellerMail } = seller
    const { email: customerMail } = customer

    const getCustomerChat = async () => {
        try {
            const { data } = await request.get(`/chats?customer=${customerMail}&opponent=${sellerMail}&boardid=${id}`);
            console.log(data)
            const messageList = data.map((v) => {
                let position
                v.email === customerMail ? position = "right" : position = "left"
                if (!v.email && v.content.indexOf("{", 0) === 0) position = "center"
                v.position = position
                return v
            })
            setMessages({ ...messages, isLoading: false, error: null, data: messageList })
        } catch (e) {
            setMessages({ ...messages, isLoading: false, error: e.message, data: null })
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
                            const { address, lat, lng, time } = JSON.parse(v.content)
                            return (<CenterMessageWrap key={v.id}>
                                <MapMessage address={address} lat={lat} lng={lng} time={time} chatid={v.id} boardid={id} customer={customer.email} seller={seller.email} />
                            </CenterMessageWrap>);
                        case "left":
                            return (
                                <LeftMessageWrap key={v.id}>
                                    <ChatUserImg src={seller.userImg} />
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