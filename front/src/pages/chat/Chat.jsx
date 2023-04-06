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
    // console.log(`sender:::`, user) // 구매자
    // console.log(`writer(receiver):::`, receiver) // 판매자
    // console.log(boardId) // 판매글번호

    useEffect(() => {
        // back-server 주소
        const socket = io(`${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`)
        // setSocketOn(socket)
        

        return () => {
            socket.disconnect();
        }
    },[])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
        socketOn.emit('init', {
            namespace: boardId,
            room: user.email,
            username: user.username
        })
        
        const namespace = io(`${config.PT}://${config.HOST}:${config.BACKEND_PORT}/${boardId}`)

        namespace.emit('join', { data: `${user.email}`})
        namespace.emit(`${user.email}`, { message: content.value} )
        namespace.on("message", (data) => {
            console.log(data)
            setText(data.message)
        })

        namespace.on('disconnect', () => {
            console.log('접속종료')
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