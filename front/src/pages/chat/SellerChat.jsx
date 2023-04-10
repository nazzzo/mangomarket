import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from "react-redux";
import { useInput } from "../../hooks"
import request from "../../utils/request"
import io from "socket.io-client"
import config from "../../config"

const ENDPOINT = `${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`;
let socket

export const SellerChat = ({ seller, customer, boardid }) => {
    const [logs, setLogs] = useState([])
    const [chats, setChats] = useState([])
    const content = useInput("")

    useEffect(() => {
        const getSellerChat = async () => {
            const response = await request.get(`/chats?seller=${seller}`)
            if (!response.data.isError) {
                setLogs(response.data);
                // const customerList = [...new Set(response.data.map(v => v.customer))]
                // const namespaceList = [...new Set(response.data.map(v => v.boardid))]
                // setCustomer(customerList)
                // setNamespace(namespaceList)
            }
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
        let data = {
            boardid,
            customer,
            seller,
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
