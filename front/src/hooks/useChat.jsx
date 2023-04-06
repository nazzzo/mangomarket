import { useEffect, useRef } from 'react';
import io from "socket.io-client";
import config from "../config";

export const useChat = ({ seller, user, boardId, setMessages }) => {
    const socketRef = useRef();

    useEffect(() => {
        const socket = io(`${config.PT}://${config.HOST}:${config.BACKEND_PORT}/`);

        socket.emit('init', { namespace: boardId, room: user.email });
        socket.on('namespace', ({ namespace }) => {
            socketRef.current = io(`${config.PT}://${config.HOST}:${config.BACKEND_PORT}/${namespace}`);
            
            socketRef.current.emit("join", { namespace: boardId, room: user.email });
            socketRef.current.on("message", (message) => {
                setMessages((prevMessages) => {
                    return[...prevMessages, message]
                });
            });

            if(socketRef.current){
                socketRef.current.disconnect()
            }

            return () => {
                socketRef.current.disconnect();
            };
        });

        // return () => {
        //     socket.disconnect();
        // };
    }, [setMessages]);

    const sendMessage = (messageBody) => {
        const message = {
            content: messageBody,
            sender: user.email,
            seller: seller.email,
            type: user.email === seller.email ? "receiver" : "sender",
        };

        socketRef.current.emit("message", message);

        setMessages((prevMessages) => {
            console.log(prevMessages)
            return [...prevMessages, message]
        });
    };

    return { sendMessage };
};