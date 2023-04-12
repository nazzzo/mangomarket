import { CustomerChat, GlobalChatter } from "./index"
import { GlobalChatWrap } from './styled'

export const Chat = ({ boardid }) => {
    return(
        <GlobalChatWrap width="27rem" height="37rem">
            {
                boardid
                ? <CustomerChat boardid={boardid} />
                : <GlobalChatter></GlobalChatter>
            }
        </GlobalChatWrap>
    )
}