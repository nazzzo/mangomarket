import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useChat, useInput } from "../../hooks"

export const Chat = ({ seller, boardId }) => {
    const content = useInput()
    const [ messages, setMessages ] = useState([])
    const { user } = useSelector((state) => state.user)


    const { sendMessage } = useChat({ seller, user, boardId, setMessages })


    const handleSubmit = (e) => {
        e.preventDefault()
        sendMessage(content.value)
    }

    return (
        <div>
            {/* Render chat messages */}
            {messages && messages.map((message, index) => (
                <div key={index}>
                    <strong>{message.sender}: </strong>
                    {message.content}
                </div>
            ))}

            {/* Render chat input form */}
            <form onSubmit={handleSubmit}>
                <input type="text" {...content} />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}