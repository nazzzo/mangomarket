import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client"


export const Chat = ({ opponent }) => {
    const { user } = useSelector((state) => state.user);
    console.log(`sender:::`, user, `writer(receiver):::`, opponent)

    useEffect(() => {
        // back-server 주소
        const socket = io(`http://localhost:3005/`)
        socket.emit('join', { user })

        socket.on('chat', (data) => {
            console.log(data)
        })

        socket.emit(`sender`, { content: "안녕하세요" })
    },[])
    

    return (
        <>

        </>
    )
}