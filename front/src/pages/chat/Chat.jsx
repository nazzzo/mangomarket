import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../../hooks"
import io from "socket.io-client"
import config from "../../config"


export const Chat = ({ receiver, boardId }) => {
    const content = useInput("")
    const { user } = useSelector((state) => state.user);
    const [ socketOn, setSocketOn ] = useState()
    const [ text, setText ] = useState("")
    console.log(receiver)
    // console.log(`sender:::`, user) // 구매자
    // console.log(`writer(receiver):::`, receiver) // 판매자
    // console.log(boardId) // 판매글번호

    const socket = io(`${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`)
    socket.emit("init", { namespace: boardId, room: user.email, username: user.username })
    
    useEffect(() => {
        // back-server 주소
        const namespace = io(`${config.PT}://${config.HOST}:${config.BACKEND_PORT}/${boardId}`)
        // setSocketOn(socket)
        // setSocketOn(namespace)
        // namespace.emit('join', { data: `${user.email}`})
        
        return () => {
            socket.disconnect();
        }
    },[])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(socketOn)
        socketOn.emit(`${user.email}`, { message: content.value} )
        socketOn.on("message", (data) => {
            console.log(data)
            setText(data.message)
        })


        // namespace.on(`${user.email}`, (data) => {
        //     console.log(data)
        // })

        // socket.emit(`${user.email}`, {
        //     content: content.value,
        //     seller: `${user.email}`,
        //     customer: `${receiver.email}`,
        //     type: `sender`,
        //     boardid: boardId,
        // })
        
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input onChange={content.onChange} value={content.value} type="text" name="content" id="content"/>
                <button type='submit'>채팅</button>
            </form>
            <div>{text}</div>
        </>
    )
}