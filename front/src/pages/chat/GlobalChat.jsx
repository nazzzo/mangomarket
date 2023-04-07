import { useEffect, useState, useCallback } from 'react';
import { useSelector } from "react-redux";
import { useInput } from "../../hooks"
import request from "../../utils/request"
import io from "socket.io-client"
import config from "../../config"

const EndPoint = `${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`;
let socket

export const GlobalChat = () => {
    const [ messages ,setMessages ] = useState([])
    const [ namespace, setNamespace ] = useState([])
    const [ customer ,setCustomer ] = useState([])
    const content = useInput("")
    const { user } = useSelector((state) => state.user);
    // console.log(`sender:::`, user) // 구매자
    // console.log(`writer(receiver):::`, receiver) // 판매자
    // console.log(boardId) // 판매글번호
    // console.log(customer) [ "", "", "", ""]
    
    
    
    useEffect(() => {
        const getSellerChat = async () => {
            // const response = await request.get(`/chat/sell/${user.email}`)
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
      }, [setMessages, namespace, customer])


    useEffect(() => {
        socket = io(EndPoint);
        socket.emit("joinRoom", { boardId: namespace[0], customer: customer[0], seller: user.email });
      
        socket.on("receiveMessage", (newMessage) => {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
      
        return () => {
          socket.off();
          socket.disconnect();
        };
      }, []);

    
    return (
        <form>
            { messages ? <ul>
                {messages.map((v) => (
                    <div key={v.id}>
                        <li>{v.id}</li>
                        <li>{v.content}</li>
                    </div>
                ))}
            </ul> : <></>}
            <input onChange={content.onChange} value={content.value} type="text" name="content" id="content"/>
            <button type='submit'>채팅</button>
        </form>
    )
}