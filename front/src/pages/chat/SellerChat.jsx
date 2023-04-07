import { useEffect, useState, useCallback } from 'react';
import { useSelector } from "react-redux";
import { useInput } from "../../hooks"
import request from "../../utils/request"
import io from "socket.io-client"
import config from "../../config"

const ENDPOINT = `${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`;
let socket

export const SellerChat = () => {
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
        socket = io(ENDPOINT);
        socket.emit("joinRoom", { room: "5-ckstn410@naver.com" });
        
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
        let data = {
            boardid: 5,
            customer: "ckstn410@naver.com",
            seller: user.email,
            type: "sender",
            content: content.value
        }
        socket.emit("sendMessage", { data } )
        const response = await request.post(`/chats`, {data})
        console.log(response.data)
        if (response.status === 201) content.clear()
    }

    return (
        <form onSubmit={handleSendMessage}>
            {logs ? <ul>
                {logs.map((v) => (
                    <div key={v.id}>
                        <li>{v.seller || v.customer}</li>
                        <li>{v.content}</li>
                    </div>
                ))}
            </ul> : <></>}
            {chats ? <ul>
                {chats.map((v, idx) => (
                    <div key={idx}>
                        <li>{v.seller || v.customer}</li>
                        <li>{v.content}</li>
                    </div>
                ))}
            </ul> : <></>}
            <input onChange={content.onChange} value={content.value} type="text" name="content" id="content" />
            <button type='submit'>채팅</button>
        </form>
    )
}