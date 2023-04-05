import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../../hooks"
import io from "socket.io-client"
import config from "../../config"


export const Chat = ({ receiver, boardId }) => {
    const content = useInput("")
    const { user } = useSelector((state) => state.user);
    // console.log(`sender:::`, user) // 구매자
    // console.log(`writer(receiver):::`, receiver) // 판매자
    // console.log(boardId) // 판매글번호

    useEffect(() => {
        // back-server 주소
        // const socket = io(`${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`)
        // socket.emit('join', { namespace: receiver.email, room: user.email })

        // socket.on(`${user.email}`, (data) => {
        //     console.log(data)
        // })

        // socket.emit(`${user.email}`, { content: "안녕하세요" })
    },[])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const socket = io(`${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`)

        socket.emit('join', {
            namespace: boardId,
            room: user.email,
            username: user.username
        })

        socket.on(`${user.email}`, (data) => {
            console.log(data)
        })

        socket.emit(`${user.email}`, {
            content: content.value,
            seller: `${user.email}`,
            customer: `${receiver.email}`,
            type: `sender`,
            boardid: boardId,
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input onChange={content.onChange} value={content.value} type="text" name="content" id="content"/>
                <button type='submit'>채팅</button>
            </form>
        </>
    )
}