import { useEffect, useState, useCallback, useMemo, memo } from 'react';
import { useSelector } from "react-redux";
import { useInput } from "../../hooks"
import { ChatForm, ChatInput, ChatButton} from "./styled"
import request from "../../utils/request"
import io from "socket.io-client"
import config from "../../config"

const ENDPOINT = `${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`;
let socket

export const SellerChat = ({ seller, customer, boardid }) => {
    const [logs, setLogs] = useState([])
    const [chats, setChats] = useState([])
    const { user } = useSelector((state) => state.user)
    const content = useInput("")

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
    }, [])

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("joinRoom", { room: `${boardid}-${customer}` });

        socket.on("receiveMessage", (newChat) => {
            console.log(`newChat: ${newChat}`)
            setChats([...chats, newChat]);
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
                        {chats.map((v, idx) => {
                            return (
                            <div key={idx}>
                                <h3>{v.username}</h3>
                                {/* <img src={v.userImg}/> */}
                                <li>{v.address}</li>
                                <li>{v.content}</li>
                            </div>
                        )})}
                    </ul>
                ) : (
                    <></>
                )}
            </div>
            <ChatForm onSubmit={handleSendMessage}>
                <ChatInput type="text" value={content.value} onChange={content.onChange} placeholder="메세지를 입력해주세요" />
                <ChatButton type="submit" />
            </ChatForm>
        </>
    )
}
