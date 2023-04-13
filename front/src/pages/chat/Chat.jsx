import { useRef } from "react";
import { CustomerChat, ChatterList } from "./"
import { GlobalChatWrap } from './styled'


export const Chat = ({ boardid }) => {
    const socket = useRef()

    return(
        <GlobalChatWrap width="27rem" height="37rem">  
        {
            boardid
            ? <CustomerChat boardid={boardid} socket={socket} />
            : <ChatterList socket={socket} />
        }
        </GlobalChatWrap>
    )
}