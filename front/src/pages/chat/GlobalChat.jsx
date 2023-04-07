import { useEffect, useState, useCallback } from 'react';
import { useSelector } from "react-redux";
import { useInput } from "../../hooks"
import request from "../../utils/request"
import io from "socket.io-client"
import config from "../../config"

const EndPoint = `${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`;
let socket

export const GlobalChat = () => {
    const [messages, setMessages] = useState([])
    const [namespace, setNamespace] = useState([])
    const [customer, setCustomer] = useState([])
    const [ a, setA] = useState([])
    const content = useInput("")
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        const getSellerChat = async () => {
            const response = await request.get(`/chats?seller=${user.email}`)
            if (!response.data.isError) {
                setMessages(response.data);
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
        socket.emit("joinRoom", { boardId: 5, customer: "ckstn410@naver.com", seller: user.email, username: user.username });
        socket.on("receiveMessage", (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleSendMessage = (e) => {
        e.preventDefault()
        socket.emit("sendMessage", {
            boardId: namespace[0],
            customer: customer[0],
            seller: user.email,
            type: "sender",
            message: content.value
        })
        content.clear()
    }

    return (
        <form onSubmit={handleSendMessage}>
            {messages ? <ul>
                {messages.map((v) => (
                    <div key={v.id}>
                        <li>{v.id}</li>
                        <li>{v.content}</li>
                    </div>
                ))}
            </ul> : <></>}
            <input onChange={content.onChange} value={content.value} type="text" name="content" id="content" />
            <button type='submit'>채팅</button>
        </form>
    )
}