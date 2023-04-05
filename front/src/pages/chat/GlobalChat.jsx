import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../../hooks"
import request from "../../utils/request"
import io from "socket.io-client"
import config from "../../config"


export const GlobalChat = ({ }) => {
    const [ chatData ,setChatData ] = useState()
    const [ customer ,setCustomer ] = useState()
    const content = useInput("")
    const { user } = useSelector((state) => state.user);
    // console.log(`sender:::`, user) // 구매자
    // console.log(`writer(receiver):::`, receiver) // 판매자
    // console.log(boardId) // 판매글번호
    // console.log(customer) [ "", "", "", ""]

    useEffect(() => {
        const getSellChat = async () => {
            // const response = await request.get(`/chat/sell/${user.email}`)
            const response = await request.get(`/chats?seller=${user.email}`)
            setChatData(response.data)
            const customerList = [...new Set(response.data.map(v => v.customer))]
            setCustomer(customerList)
        }

        const getBuyChat = async () => {
            // const response = await request.get(`/chat/buy/${user.email}`)
            const response = await request.get(`/chats?customer=${user.email}`)
        }

        getSellChat()
    },[])

    
    const handleSubmit = (e) => {
        e.preventDefault()
        const socket = io(`${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`)
        socket.emit('join', { namespace: "", room: user.email, username: user.username })
        socket.on(`${user.email}`, (data) => {
            console.log(data)
        })
        socket.emit(`${user.email}`, { content: content.value })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input onChange={content.onChange} value={content.value} type="text" name="content" id="content"/>
            <button type='submit'>채팅</button>
            { chatData ? <ul>
                {chatData.map((v) => (
                    <div key={v.id}>
                        <li>{v.id}</li>
                        <li>{v.content}</li>
                    </div>
                ))}
            </ul> : <></>}
        </form>
    )
}