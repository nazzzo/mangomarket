import { useEffect, useState, useCallback } from 'react';
import { useSelector } from "react-redux";
import { useInput } from "../../hooks"
import request from "../../utils/request"
import io from "socket.io-client"
import config from "../../config"

const EndPoint = `${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`;
let socket

export const GlobalChat = () => {
    const [logs, setLogs] = useState([])
    const [chats, setChats] = useState([])
    const [namespace, setNamespace] = useState([])
    const [customer, setCustomer] = useState([])
    const content = useInput("")
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        const getSellerChat = async () => {
            const response = await request.get(`/chats?seller=${user.email}`)
            if (!response.data.isError) {
                setLogs(response.data);
                const customerList = [...new Set(response.data.map(v => v.customer))]
                const namespaceList = [...new Set(response.data.map(v => v.boardid))]
                setCustomer(customerList)
                setNamespace(namespaceList)
            }
        }
        
        getSellerChat()
    }, [])


    useEffect(() => {
        socket = io(EndPoint);
        socket.emit("joinRoom", { boardId: 38, customer: "avin1107@naver.com", seller: user.email });
        socket.on("receiveMessage", (newChat) => {
            console.log(`newChat: ${newChat}`)
            setChats((prevChats) => [...prevChats, newChat]);
        });

        return () => {
            socket.disconnect();
        };
    }, [chats]);

    const handleSendMessage = (e) => {
        e.preventDefault()
        socket.emit("sendMessage", {
            boardId: 38,
            customer: "avin1107@naver.com",
            seller: user.email,
            type: "sender",
            content: content.value
        })
        content.clear()
    }

    return (
        <form onSubmit={handleSendMessage}>
            {logs ? <ul>
                {logs.map((v) => (
                    <div>
                        <li>{v.content}</li>
                    </div>
                ))}
            </ul> : <></>}
            {chats ? <ul>
                {chats.map((v) => (
                    <div>
                        <li>{v.content}</li>
                    </div>
                ))}
            </ul> : <></>}
            <input onChange={content.onChange} value={content.value} type="text" name="content" id="content" />
            <button type='submit'>채팅</button>
        </form>
    )
}