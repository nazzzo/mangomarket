import { useEffect, useState, useCallback, useMemo, memo } from 'react';
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
    const { user } = useSelector((state) => state.user)
    const content = useInput("")

    useEffect(() => {
        const getSellerChat = async () => {
            const response = await request.get(`/chats?seller=${seller}&opponent=${customer}&boardid=${boardid}`)
            if (!response.data.isError) {
                console.log(response.data)
                setLogs(response.data);
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

        if(seller !== user.email) seller = user.email
        
        let data = {
            boardid,
            customer,
            seller,
            content: content.value,
            email: seller,
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
            <form onSubmit={handleSendMessage}>
                <input type="text" value={content.value} onChange={content.onChange} />
                <button type="submit">전송</button>
            </form>
        </>
    )
}
